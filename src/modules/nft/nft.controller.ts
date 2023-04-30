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
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';

import { AuthenticationGuard } from 'src/modules/auth/guard/auth.guard';
import { NftService } from './nft.service';
import { CreateNftDto } from './dto/createNft.dto';
import { DetailNftQueryDto } from './dto/detailNftQuery.dto';
import { GetNftsQueryDto } from './dto/getNftsQuery.dto';

@ApiTags('NFT')
@Controller('nft')
export class NftController {
  constructor(private nftService: NftService) {}

  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth()
  @Post()
  async createNft(@Request() request, @Body() CreateNftDto: CreateNftDto) {
    return this.nftService.createNft(CreateNftDto);
  }

  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth()
  @ApiQuery({ type: GetNftsQueryDto })
  @Get()
  async getNfts(
    @Request() request,
    @Query('min') min,
    @Query('max') max,
    @Query('currency') currency = 0,
    @Query('collectionId') collectionId,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(12), ParseIntPipe) limit = 12
  ) {
    return this.nftService.getNfts(request.user, { min, max, currency }, collectionId, {
      page,
      limit
    });
  }

  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth()
  @ApiQuery({ type: DetailNftQueryDto })
  @Get('/detail')
  async getNft(@Query('collectionAddress') collectionAddress, @Query('tokenId') tokenId) {
    return this.nftService.getNft(collectionAddress, tokenId);
  }
}
