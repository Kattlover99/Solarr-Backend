import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Post,
  Delete,
  Patch,
  Param,
  Query,
  Request,
  UseGuards
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { AuthenticationGuard } from 'src/modules/auth/guard/auth.guard';
import { ListHistoryService } from './listHistory.service';
import { CreateListHistoryDto } from './dto/createListHistory.dto';
import { UpdateListHistoryDto } from './dto/updateListHistory.dto';

@ApiTags('ListHistory')
@Controller('list-history')
export class ListHistoryController {
  constructor(private listHistoryService: ListHistoryService) {}

  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth()
  @Post()
  async mint(@Request() request, @Body() createListHistoryDto: CreateListHistoryDto) {
    return this.listHistoryService.createListHistory(createListHistoryDto);
  }

  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth()
  @Get()
  async getTransactionByAction(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit = 20
  ) {
    return this.listHistoryService.getListHistorys({
      page,
      limit
    });
  }

  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth()
  @Patch('/:id')
  async updateListHistory(@Param('id') id: string, @Body() updateListHistoryDto: UpdateListHistoryDto) {
    return this.listHistoryService.updateListHistory(id, updateListHistoryDto);
  }

  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth()
  @Delete('/:id')
  async deleteListHistory(@Param('id') id: string) {
    return this.listHistoryService.deleteListHistory(id);
  }
}
