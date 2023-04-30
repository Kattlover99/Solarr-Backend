import { CoreEntity } from 'src/core/typeorm/core.entity';
export declare class User extends CoreEntity {
    nonce: string;
    username: string;
    walletAddress: string;
    avatar: string;
    totalLiquified: number;
    averageLiquified: number;
    averageLiquifiedPeriod: number;
    totalSupplied: number;
    averageSupplied: number;
    averageSuppliedPeriod: number;
    liquified: number;
    supplied: number;
    returned: number;
    breached: number;
}
