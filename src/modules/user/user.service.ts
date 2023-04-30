import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as ethUtil from 'ethereumjs-util';
import { Repository } from 'typeorm';

import { AuthPayload } from 'src/modules/auth/interface/auth-payload.interface';
import { S3Service } from 'src/modules/s3/s3.service';
import { CreateUserDto } from './dto/createUser.dto';
import { GenerateNonceDto } from './dto/generateNonce.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { VerifySignatureDto } from './dto/verifySignature.dto';
import { User } from './entities/user.entity';
import { List } from '../list/entities/list.entity';
import { Offer } from '../offer/entities/offer.entity';
import { LoanHistory } from '../loanHistory/entities/loanHistory.entity';
import { Notification } from '../notification/entities/notification.entity';
import { NotificationService } from '../notification/notification.service';
import { Loan } from '../loan/entities/loan.entity';
import { identity } from 'rxjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(List) private listRepository: Repository<List>,
    @InjectRepository(Offer) private offerRepository: Repository<Offer>,
    @InjectRepository(LoanHistory) private loanHistoryRepository: Repository<LoanHistory>,
    @InjectRepository(Notification) private notificationRepository: Repository<Notification>,
    @InjectRepository(Loan) private loanRepository: Repository<Loan>,
    private s3Service: S3Service,
    private jwtService: JwtService,
    private notificationService: NotificationService
  ) {}

  private async getUserStats(id: string | number) {
    const user: any = {};
    const lists = await this.listRepository.find({ where: { borrowerId: id } });

    if (lists && lists.length) {
      user.totalLiquified = lists.reduce((init, el) => {
        return init + parseFloat(el.loanAmount.toString());
      }, 0);
      user.averageLiquified = user.totalLiquified / lists.length;
      user.averageLiquifiedPeriod = Math.ceil(
        lists.reduce((init, el) => {
          return init + el.period;
        }, 0) / lists.length
      );

      const offers = await this.offerRepository.find({
        where: { borrowerId: user.id, state: 1 }
      });
      user.totalSupplied = offers.reduce((init, el) => {
        return init + parseFloat(el.loanAmount.toString());
      }, 0);
      user.averageSupplied = user.totalSupplied / offers.length;
      user.averageSuppliedPeriod = Math.ceil(
        offers.reduce((init, el) => {
          return init + el.period;
        }, 0) / offers.length
      );

      user.liquified = lists.length;
      user.supplied = offers.length;
      user.returned = await this.loanHistoryRepository.count({ where: { action: 1 } });
      user.breached = await this.loanHistoryRepository.count({ where: { action: 2 } });
    }

    return user;
  }

  async getUserByAddress(address: string): Promise<User> {
    let user = await this.userRepository.findOne({ where: { walletAddress: address } });

    if (user && user.id) {
      const userStats = await this.getUserStats(user.id);
      user = Object.assign(user, userStats);
    }

    return user;
  }

  async getUserById(id: number): Promise<User> {
    let user = await this.userRepository.findOne({ where: { id } });

    if (user && user.id) {
      const userStats = await this.getUserStats(user.id);
      user = Object.assign(user, userStats);
    }

    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { address } = createUserDto;
    const user = new User();
    user.walletAddress = address;
    user.nonce = Math.random().toString(36).substring(2);
    await this.userRepository.save(user);
    return user;
  }

  async generateNonce(generateNonceDto: GenerateNonceDto): Promise<{ nonce: string }> {
    const { address } = generateNonceDto;
    let user: User = await this.getUserByAddress(address);

    if (!user) {
      const createUserDto: CreateUserDto = { address };
      user = await this.createUser(createUserDto);
    } else {
      user.nonce = Math.random().toString(36).substring(2);
      await this.userRepository.save(user);
    }

    return { nonce: user.nonce };
  }

  async verifySignature(
    verifySignatureDto: VerifySignatureDto
  ): Promise<{ token: string; user: User } | null> {
    const { address, signature } = verifySignatureDto;
    const user: User = await this.getUserByAddress(address);

    if (user) {
      const msg = `Nonce: ${user.nonce}`;
      const msgHex = ethUtil.bufferToHex(Buffer.from(msg));
      const msgBuffer = ethUtil.toBuffer(msgHex);
      const msgHash = ethUtil.hashPersonalMessage(msgBuffer);

      const signatureBuffer = ethUtil.toBuffer(signature);
      // @ts-ignore
      const signatureParams = ethUtil.fromRpcSig(signatureBuffer);
      const publicKey = ethUtil.ecrecover(
        msgHash,
        signatureParams.v,
        signatureParams.r,
        signatureParams.s
      );
      const addresBuffer = ethUtil.publicToAddress(publicKey);
      const address = ethUtil.bufferToHex(addresBuffer);

      if (address.toLowerCase() === address.toLowerCase()) {
        // Change user nonce
        user.nonce = Math.random().toString(36).substring(2);
        await this.userRepository.save(user);

        const token: AuthPayload = {
          id: user.id,
          address: user.walletAddress
        };

        return {
          token: this.jwtService.sign(token),
          user
        };
      } else {
        // User is not authenticated
        throw new UnauthorizedException('Invalid credentials');
      }
    }

    return null;
  }

  async getMe(payload: { id: string; address: string }) {
    const { address } = payload;
    const user: User = await this.getUserByAddress(address);
    return { user };
  }

  async uploadAvatar(id: string, file: any) {
    file.path = `avatar/${id}`;
    const result = await this.s3Service.uploadFile(file);
    return { url: result.Location };
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    await this.userRepository.update(id, updateUserDto);
    const updatedUser = await this.userRepository.findOne(id);
    if (updatedUser) {
      return updatedUser;
    }
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }
}
