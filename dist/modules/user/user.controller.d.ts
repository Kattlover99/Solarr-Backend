import { GenerateNonceDto } from './dto/generateNonce.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { VerifySignatureDto } from './dto/verifySignature.dto';
import { UserService } from './user.service';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    generateNonce(generateNonceDto: GenerateNonceDto): Promise<{
        nonce: string;
    }>;
    verifySignature(verifySignatureDto: VerifySignatureDto): Promise<{
        token: string;
        user: import("./entities/user.entity").User;
    }>;
    getMe(request: any): Promise<{
        user: import("./entities/user.entity").User;
    }>;
    getUser(id: number): Promise<import("./entities/user.entity").User>;
    getUserByAddress(walletAddress: string): Promise<import("./entities/user.entity").User>;
    updateUser(request: any, updateUserDto: UpdateUserDto): Promise<import("./entities/user.entity").User>;
    uploadAvatar(file: any, request: any): Promise<{
        url: any;
    }>;
}
