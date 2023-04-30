import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Faq } from './entities/faq.entity';

@Injectable()
export class FaqService {
  constructor(@InjectRepository(Faq) private faqRepository: Repository<Faq>) {}

  async getAll(): Promise<any> {
    return this.faqRepository.find();
  }
}
