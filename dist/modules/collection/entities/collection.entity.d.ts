import { CoreEntity } from 'src/core/typeorm/core.entity';
export declare class Collection extends CoreEntity {
    name: string;
    address: string;
    whitelisted: boolean;
}
