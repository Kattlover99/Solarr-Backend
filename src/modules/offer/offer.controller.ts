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
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';

import { AuthenticationGuard } from 'src/modules/auth/guard/auth.guard';
import { OfferService } from './offer.service';
import { OfferDto } from './dto/offer.dto';
import { UpdateOfferDto } from './dto/updateOffer.dto';
import { OffersNftQueryDto } from './dto/offersNftQuery.dto';
import { OffersReceivedQueryDto } from './dto/offerReceivedQuery.dto';
import { OfferQueryDto } from './dto/offerQuery.dto';
import { OffersMadeQueryDto } from './dto/offerMadeQuery.dto';

@ApiTags('Offer')
@Controller('offer')
export class OfferController {
  constructor(private offerService: OfferService) {}

  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth()
  @Post()
  async createOffer(@Request() request, @Body() OfferDto: OfferDto) {
    return this.offerService.createOffer(OfferDto);
  }

  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth()
  @Get()
  async getOffers(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit = 20
  ) {
    return this.offerService.getOffers({
      page,
      limit
    });
  }

  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth()
  @ApiQuery({ type: OfferQueryDto })
  @Get('/offer')
  async getOffer(
    @Query('lenderId') lenderId,
    @Query('collectionAddress') collectionAddress,
    @Query('tokenId') tokenId,
    @Query('state', new DefaultValuePipe(0), ParseIntPipe) state = 0
  ) {
    return this.offerService.getOffer(lenderId, collectionAddress, tokenId, state);
  }

  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth()
  @ApiQuery({ type: OffersNftQueryDto })
  @Get('/nft')
  async getOffersNft(
    @Query('collectionAddress') collectionAddress,
    @Query('tokenId') tokenId,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(6), ParseIntPipe) limit = 6
  ) {
    return this.offerService.getOffersNft(collectionAddress, tokenId, {
      page,
      limit
    });
  }

  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth()
  @ApiQuery({ type: OffersReceivedQueryDto })
  @Get('/received')
  async getOffersReceived(
    @Query('borrowerId') borrowerId,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(8), ParseIntPipe) limit = 8
  ) {
    return this.offerService.getOffersReceived(borrowerId, {
      page,
      limit
    });
  }

  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth()
  @ApiQuery({ type: OffersMadeQueryDto })
  @Get('/made')
  async getOffersMade(
    @Query('lenderId') lenderId,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(8), ParseIntPipe) limit = 8
  ) {
    return this.offerService.getOffersMade(lenderId, {
      page,
      limit
    });
  }

  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth()
  @Patch('/:id')
  async updateOffer(@Param('id') id: string, @Body() updateOfferDto: UpdateOfferDto) {
    return this.offerService.updateOffer(id, updateOfferDto);
  }

  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth()
  @Delete('/:id')
  async deleteOffer(@Param('id') id: string) {
    return this.offerService.deleteOffer(id);
  }
}
