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
import { ListService } from './list.service';
import { CreateListDto } from './dto/createList.dto';
import { UpdateListDto } from './dto/updateList.dto';
import { ListByAccountDto } from './dto/listByAccountDto';
import * as request from 'supertest';
import { GetListDto } from './dto/getList.dto';

@ApiTags('List')
@Controller('list')
export class ListController {
  constructor(private listService: ListService) {}

  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth()
  @Post()
  async createList(@Body() createListDto: CreateListDto) {
    return this.listService.createList(createListDto);
  }

  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth()
  @Get()
  async getLists(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit = 20,
    @Query('orderByDate', new DefaultValuePipe(0), ParseIntPipe) orderByDate = 0,
    @Query('orderByAmount', new DefaultValuePipe(0), ParseIntPipe) orderByAmount = 0,
    @Query('orderByCollection', new DefaultValuePipe(0), ParseIntPipe) orderByCollection = 0,
    @Query('collection', new DefaultValuePipe(''), ParseIntPipe) collection = '',
    @Query('minAmount', new DefaultValuePipe(0), ParseIntPipe) minAmount = 0,
    @Query('maxAmount', new DefaultValuePipe(999999), ParseIntPipe) maxAmount = 999999,
    @Body() getListDto: GetListDto
  ) {
    return this.listService.getLists(
      {
        page,
        limit,
        orderByDate,
        orderByAmount,
        orderByCollection,
        collection,
        minAmount,
        maxAmount
      },
      getListDto
    );
  }

  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth()
  @Post('/account')
  async getByAccount(@Body() listByAccountDto: ListByAccountDto) {
    return this.listService.getListByAccount(listByAccountDto);
  }

  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth()
  @Patch('/:id')
  async updateList(@Param('id') id: string, @Body() updateListDto: UpdateListDto) {
    return this.listService.updateList(id, updateListDto);
  }

  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth()
  @Delete('/:id')
  async deleteList(@Param('id') id: string) {
    return this.listService.deleteList(id);
  }
}
