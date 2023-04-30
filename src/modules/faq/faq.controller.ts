import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FaqService } from './faq.service';

@ApiTags('FAQ')
@Controller('faq')
export class FaqController {
  constructor(private faqService: FaqService) {}

  @Get()
  async getAll() {
    return this.faqService.getAll();
  }
}
