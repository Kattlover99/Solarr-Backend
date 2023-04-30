import { Repository } from 'typeorm';
import { Faq } from './entities/faq.entity';
export declare class FaqService {
    private faqRepository;
    constructor(faqRepository: Repository<Faq>);
    getAll(): Promise<any>;
}
