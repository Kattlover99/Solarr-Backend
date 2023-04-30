import { CoreEntity } from 'src/core/typeorm/core.entity';
export declare class Faq extends CoreEntity {
    type: number;
    question: string;
    content: string;
}
