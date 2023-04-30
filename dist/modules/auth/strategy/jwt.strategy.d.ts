import { ConfigService } from 'src/config/config.service';
import { AuthPayload } from 'src/modules/auth/interface/auth-payload.interface';
declare const JsonWebTokenStrategy_base: new (...args: any[]) => any;
export declare class JsonWebTokenStrategy extends JsonWebTokenStrategy_base {
    private configService;
    constructor(configService: ConfigService);
    validate(payload: AuthPayload): Promise<{
        id: string | number;
        address: string;
    }>;
}
export {};
