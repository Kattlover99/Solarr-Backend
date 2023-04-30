"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const ethUtil = require("ethereumjs-util");
const typeorm_2 = require("typeorm");
const s3_service_1 = require("../s3/s3.service");
const user_entity_1 = require("./entities/user.entity");
const list_entity_1 = require("../list/entities/list.entity");
const offer_entity_1 = require("../offer/entities/offer.entity");
const loanHistory_entity_1 = require("../loanHistory/entities/loanHistory.entity");
const notification_entity_1 = require("../notification/entities/notification.entity");
const notification_service_1 = require("../notification/notification.service");
const loan_entity_1 = require("../loan/entities/loan.entity");
let UserService = class UserService {
    constructor(userRepository, listRepository, offerRepository, loanHistoryRepository, notificationRepository, loanRepository, s3Service, jwtService, notificationService) {
        this.userRepository = userRepository;
        this.listRepository = listRepository;
        this.offerRepository = offerRepository;
        this.loanHistoryRepository = loanHistoryRepository;
        this.notificationRepository = notificationRepository;
        this.loanRepository = loanRepository;
        this.s3Service = s3Service;
        this.jwtService = jwtService;
        this.notificationService = notificationService;
    }
    async getUserStats(id) {
        const user = {};
        const lists = await this.listRepository.find({ where: { borrowerId: id } });
        if (lists && lists.length) {
            user.totalLiquified = lists.reduce((init, el) => {
                return init + parseFloat(el.loanAmount.toString());
            }, 0);
            user.averageLiquified = user.totalLiquified / lists.length;
            user.averageLiquifiedPeriod = Math.ceil(lists.reduce((init, el) => {
                return init + el.period;
            }, 0) / lists.length);
            const offers = await this.offerRepository.find({
                where: { borrowerId: user.id, state: 1 }
            });
            user.totalSupplied = offers.reduce((init, el) => {
                return init + parseFloat(el.loanAmount.toString());
            }, 0);
            user.averageSupplied = user.totalSupplied / offers.length;
            user.averageSuppliedPeriod = Math.ceil(offers.reduce((init, el) => {
                return init + el.period;
            }, 0) / offers.length);
            user.liquified = lists.length;
            user.supplied = offers.length;
            user.returned = await this.loanHistoryRepository.count({ where: { action: 1 } });
            user.breached = await this.loanHistoryRepository.count({ where: { action: 2 } });
        }
        return user;
    }
    async getUserByAddress(address) {
        let user = await this.userRepository.findOne({ where: { walletAddress: address } });
        if (user && user.id) {
            const userStats = await this.getUserStats(user.id);
            user = Object.assign(user, userStats);
        }
        return user;
    }
    async getUserById(id) {
        let user = await this.userRepository.findOne({ where: { id } });
        if (user && user.id) {
            const userStats = await this.getUserStats(user.id);
            user = Object.assign(user, userStats);
        }
        return user;
    }
    async createUser(createUserDto) {
        const { address } = createUserDto;
        const user = new user_entity_1.User();
        user.walletAddress = address;
        user.nonce = Math.random().toString(36).substring(2);
        await this.userRepository.save(user);
        return user;
    }
    async generateNonce(generateNonceDto) {
        const { address } = generateNonceDto;
        let user = await this.getUserByAddress(address);
        if (!user) {
            const createUserDto = { address };
            user = await this.createUser(createUserDto);
        }
        else {
            user.nonce = Math.random().toString(36).substring(2);
            await this.userRepository.save(user);
        }
        return { nonce: user.nonce };
    }
    async verifySignature(verifySignatureDto) {
        const { address, signature } = verifySignatureDto;
        const user = await this.getUserByAddress(address);
        if (user) {
            const msg = `Nonce: ${user.nonce}`;
            const msgHex = ethUtil.bufferToHex(Buffer.from(msg));
            const msgBuffer = ethUtil.toBuffer(msgHex);
            const msgHash = ethUtil.hashPersonalMessage(msgBuffer);
            const signatureBuffer = ethUtil.toBuffer(signature);
            const signatureParams = ethUtil.fromRpcSig(signatureBuffer);
            const publicKey = ethUtil.ecrecover(msgHash, signatureParams.v, signatureParams.r, signatureParams.s);
            const addresBuffer = ethUtil.publicToAddress(publicKey);
            const address = ethUtil.bufferToHex(addresBuffer);
            if (address.toLowerCase() === address.toLowerCase()) {
                user.nonce = Math.random().toString(36).substring(2);
                await this.userRepository.save(user);
                const token = {
                    id: user.id,
                    address: user.walletAddress
                };
                return {
                    token: this.jwtService.sign(token),
                    user
                };
            }
            else {
                throw new common_1.UnauthorizedException('Invalid credentials');
            }
        }
        return null;
    }
    async getMe(payload) {
        const { address } = payload;
        const user = await this.getUserByAddress(address);
        return { user };
    }
    async uploadAvatar(id, file) {
        file.path = `avatar/${id}`;
        const result = await this.s3Service.uploadFile(file);
        return { url: result.Location };
    }
    async updateUser(id, updateUserDto) {
        await this.userRepository.update(id, updateUserDto);
        const updatedUser = await this.userRepository.findOne(id);
        if (updatedUser) {
            return updatedUser;
        }
        throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(list_entity_1.List)),
    __param(2, (0, typeorm_1.InjectRepository)(offer_entity_1.Offer)),
    __param(3, (0, typeorm_1.InjectRepository)(loanHistory_entity_1.LoanHistory)),
    __param(4, (0, typeorm_1.InjectRepository)(notification_entity_1.Notification)),
    __param(5, (0, typeorm_1.InjectRepository)(loan_entity_1.Loan)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        s3_service_1.S3Service,
        jwt_1.JwtService,
        notification_service_1.NotificationService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map