import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Request,
  UseGuards
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { AuthenticationGuard } from 'src/modules/auth/guard/auth.guard';
import { OfferHistoryService } from './offerHistory.service';
import { CreateOfferHistoryDto } from './dto/createOfferHistory.dto';
import { UpdateOfferHistoryDto } from './dto/updateOfferHistory.dto';

@ApiTags('OfferHistory')
@Controller('offer-history')
export class OfferHistoryController {
  constructor(private offerHistoryService: OfferHistoryService) {}

  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth()
  @Post()
  async mint(@Request() request, @Body() createOfferHistoryDto: CreateOfferHistoryDto) {
    return this.offerHistoryService.createOfferHistory(createOfferHistoryDto);
  }

  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth()
  @Get()
  async getTransactionByAction(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit = 20
  ) {
    return this.offerHistoryService.getOfferHistorys({
      page,
      limit
    });
  }

  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth()
  @Patch('/:id')
  async updateOfferHistory(@Param('id') id: string, @Body() updateOfferHistoryDto: UpdateOfferHistoryDto) {
    return this.offerHistoryService.updateOfferHistory(id, updateOfferHistoryDto);
  }

  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth()
  @Delete('/:id')
  async deleteOfferHistory(@Param('id') id: string) {
    return this.offerHistoryService.deleteOfferHistory(id);
  }
}
