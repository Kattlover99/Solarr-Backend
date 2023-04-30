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
import { WhitelistService } from './whitelist.service';
import { CreateWhitelistDto } from './dto/createWhitelist.dto';

@ApiTags('Whitelist')
@Controller('whitelist')
export class WhitelistController {
  constructor(private listService: WhitelistService) {}

  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth()
  @Post()
  async create(@Request() request, @Body() CreateWhitelistDto: CreateWhitelistDto) {
    return this.listService.createWhitelist(CreateWhitelistDto);
  }

  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth()
  @Get()
  async getTransactionByAction(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit = 20
  ) {
    return this.listService.getWhitelists({
      page,
      limit
    });
  }
}
