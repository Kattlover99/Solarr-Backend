import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Post,
  Query,
  Request,
  UseGuards
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { AuthenticationGuard } from 'src/modules/auth/guard/auth.guard';
import { HistoryService } from './history.service';
import { CreateHistoryDto } from './dto/createHistory.dto';

@ApiTags('History')
@Controller('history')
export class HistoryController {
  constructor(private historyService: HistoryService) {}

  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth()
  @Post()
  async mint(@Request() request, @Body() createHistoryDto: CreateHistoryDto) {
    return this.historyService.createHistory(createHistoryDto);
  }

  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth()
  @Get()
  async getTransactionByAction(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit = 20
  ) {
    return this.historyService.getHistorys({
      page,
      limit
    });
  }
}
