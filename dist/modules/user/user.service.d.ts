import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
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
export declare class UserService {
    private userRepository;
    private listRepository;
    private offerRepository;
    private loanHistoryRepository;
    private notificationRepository;
    private loanRepository;
    private s3Service;
    private jwtService;
    private notificationService;
    constructor(userRepository: Repository<User>, listRepository: Repository<List>, offerRepository: Repository<Offer>, loanHistoryRepository: Repository<LoanHistory>, notificationRepository: Repository<Notification>, loanRepository: Repository<Loan>, s3Service: S3Service, jwtService: JwtService, notificationService: NotificationService);
    private getUserStats;
    getUserByAddress(address: string): Promise<User>;
    getUserById(id: number): Promise<User>;
    createUser(createUserDto: CreateUserDto): Promise<User>;
    generateNonce(generateNonceDto: GenerateNonceDto): Promise<{
        nonce: string;
    }>;
    verifySignature(verifySignatureDto: VerifySignatureDto): Promise<{
        token: string;
        user: User;
    } | null>;
    getMe(payload: {
        id: string;
        address: string;
    }): Promise<{
        user: User;
    }>;
    uploadAvatar(id: string, file: any): Promise<{
        url: any;
    }>;
    updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User>;
}
