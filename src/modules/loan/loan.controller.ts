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
  UseGuards
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';

import { AuthenticationGuard } from 'src/modules/auth/guard/auth.guard';
import { LoanService } from './loan.service';
import { LoanDto } from './dto/loan.dto';
import { UpdateLoanDto } from './dto/updateLoan.dto';
import { LoansNftQueryDto } from './dto/loansNftQuery.dto';
import { LoanLiquifiedQueryDto } from './dto/loanLiquifiedQuery.dto';
import { LoanSuppliedQueryDto } from './dto/loanSuppliedQuery.dto';

@ApiTags('Loan')
@Controller('loan')
export class LoanController {
  constructor(private loanService: LoanService) {}

  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth()
  @Post()
  async createLoan(@Body() loanDto: LoanDto) {
    return this.loanService.createLoan(loanDto);
  }

  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth()
  @Get()
  async getLoans(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit = 20
  ) {
    return this.loanService.getLoans({
      page,
      limit
    });
  }

  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth()
  @ApiQuery({ type: LoansNftQueryDto })
  @Get('/nft')
  async getLoansOfNft(
    @Query('collectionAddress') collectionAddress,
    @Query('tokenId') tokenId,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(6), ParseIntPipe) limit = 6
  ) {
    return this.loanService.getLoansOfNft(collectionAddress, tokenId, {
      page,
      limit
    });
  }

  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth()
  @ApiQuery({ type: LoanLiquifiedQueryDto })
  @Get('/liquified')
  async getLoansLiquified(
    @Query('borrowerId') borrowerId,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(8), ParseIntPipe) limit = 8
  ) {
    return this.loanService.getLoansLiquified(borrowerId, {
      page,
      limit
    });
  }

  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth()
  @ApiQuery({ type: LoanSuppliedQueryDto })
  @Get('/supplied')
  async getLoansSupplied(
    @Query('lenderId') lenderId,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(8), ParseIntPipe) limit = 8
  ) {
    return this.loanService.getLoansSupplied(lenderId, {
      page,
      limit
    });
  }

  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth()
  @Get('/detail')
  async getLoan(
    @Query('borrowerId') borrowerId,
    @Query('collectionAddress') collectionAddress,
    @Query('tokenId') tokenId,
    @Query('state', new DefaultValuePipe(0), ParseIntPipe) state = 0
  ) {
    return this.loanService.getLoan(borrowerId, collectionAddress, tokenId, state);
  }

  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth()
  @Patch('/:id')
  async updateLoan(@Param('id') id: string, @Body() updateLoanDto: UpdateLoanDto) {
    return this.loanService.updateLoan(id, updateLoanDto);
  }

  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth()
  @Delete('/:id')
  async deleteLoan(@Param('id') id: string) {
    return this.loanService.deleteLoan(id);
  }
}
