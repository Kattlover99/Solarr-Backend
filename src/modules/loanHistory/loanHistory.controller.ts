import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Post,
  Patch,
  Query,
  Request,
  UseGuards,
  Param,
  Delete
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';

import { AuthenticationGuard } from 'src/modules/auth/guard/auth.guard';
import { LoanHistoryService } from './loanHistory.service';
import { CreateLoanHistoryDto } from './dto/createLoanHistory.dto';
import { UpdateLoanHistoryDto } from './dto/updateLoanHistory';
import { LoanHistoryNftQueryDto } from './dto/loanHistoryNftQuery.dto';

@ApiTags('LoanHistory')
@Controller('loan-history')
export class LoanHistoryController {
  constructor(private loanHistoryService: LoanHistoryService) {}

  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth()
  @Post()
  async mint(@Request() request, @Body() createLoanHistoryDto: CreateLoanHistoryDto) {
    return this.loanHistoryService.createLoanHistory(createLoanHistoryDto);
  }

  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth()
  @ApiQuery({ type: LoanHistoryNftQueryDto })
  @Get('/nft')
  async getLoanHistoryByNft(
    @Query('collectionAddress') collectionAddress,
    @Query('tokenId') tokenId,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(6), ParseIntPipe) limit = 6
  ) {
    return this.loanHistoryService.getLoanHistoryByNft(collectionAddress, tokenId, {
      page,
      limit
    });
  }

  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth()
  @Get()
  async getTransactionByAction(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit = 20
  ) {
    return this.loanHistoryService.getLoanHistorys({
      page,
      limit
    });
  }

  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth()
  @Patch('/:id')
  async updateLoanHistory(@Param('id') id: string, @Body() updateLoanHistoryDto: UpdateLoanHistoryDto) {
    return this.loanHistoryService.updateLoanHistory(id, updateLoanHistoryDto);
  }

  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth()
  @Delete('/:id')
  async deleteLoanHistory(@Param('id') id: string) {
    return this.loanHistoryService.deleteLoanHistory(id);
  }
}
