import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginateRawAndEntities } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';

import { CollectionService } from 'src/modules/collection/collection.service';
import { List } from 'src/modules/list/entities/list.entity';
import { Offer } from 'src/modules/offer/entities/offer.entity';

import { CreateNftDto } from './dto/createNft.dto';
import { Nft } from './entities/nft.entity';
import { Loan } from '../loan/entities/loan.entity';

@Injectable()
export class NftService {
  constructor(
    @InjectRepository(Nft) private nftRepository: Repository<Nft>,
    @InjectRepository(List) private listRepository: Repository<List>,
    @InjectRepository(Offer) private offerRepository: Repository<Offer>,
    private collectionService: CollectionService
  ) {}

  async createNft(createNftDto: CreateNftDto): Promise<Nft> {
    const nft = new Nft();
    const {
      name,
      ownerId,
      tokenId,
      state,
      collectionFloor,
      bankValuation,
      collectionAddress,
      metadata
    } = createNftDto;
    const collection = await this.collectionService.getCollectionbyAddress(name, collectionAddress);
    const oldNft = await this.nftRepository.findOne({
      where: { tokenId, collectionId: collection.id }
    });

    if (createNftDto && !oldNft) {
      nft.name = name;
      nft.ownerId = ownerId;
      nft.tokenId = tokenId;
      nft.state = state;
      nft.collectionFloor = collectionFloor;
      nft.bankValuation = bankValuation;
      nft.metadata = metadata;
      nft.collectionId = collection.id;
      await this.nftRepository.save(nft);
    }
    return oldNft ? oldNft : nft;
  }

  async getNfts(
    user: { id: string },
    loanFilter: { min: string; max: string; currency: number },
    collectionId: string,
    options: IPaginationOptions
  ) {
    const { id } = user;
    const { min, max, currency } = loanFilter;
    const collectionIdArr = collectionId && collectionId.split(',');

    const qb = this.nftRepository
      .createQueryBuilder('nft')
      .select()
      .leftJoinAndSelect('nft.collection', 'collection')
      .leftJoinAndSelect(
        (qb) =>
          qb
            .select('id', 'list_id')
            .addSelect('borrower_id', 'list_borrower_id')
            .addSelect('token_id', 'list_token_id')
            .addSelect('collection_address', 'list_collection_address')
            .addSelect('loan_amount', 'list_loan_amount')
            .addSelect('loan_type', 'list_loan_type')
            .from(List, 'list'),
        'list',
        `nft.owner_id = list.list_borrower_id
        AND nft.token_id = list.list_token_id
        AND collection.address = list.list_collection_address`
      )
      .leftJoinAndSelect(
        (qb) =>
          qb
            .select('id', 'offer_id')
            .addSelect('lender_id', 'offer_lender_id')
            .addSelect('token_id', 'offer_token_id')
            .addSelect('collection_address', 'offer_collection_address')
            .addSelect('state', 'offer_state')
            .from(Offer, 'offer'),
        'offer',
        `offer.offer_lender_id = :user_id 
        AND nft.token_id = offer.offer_token_id 
        AND collection.address = offer.offer_collection_address
        AND offer_state = 0`,
        { user_id: id }
      )
      .leftJoinAndSelect(
        (qb) =>
          qb
            .select('id', 'loan_id')
            .addSelect('borrower_id', 'loan_borrower_id')
            .addSelect('token_id', 'loan_token_id')
            .addSelect('collection_address', 'loan_collection_address')
            .addSelect('state', 'loan_state')
            .from(Loan, 'loan'),
        'loan',
        `loan.loan_borrower_id = nft.owner_id
        AND nft.token_id = loan.loan_token_id 
        AND collection.address = loan.loan_collection_address`
      )
      .where('(loan_id IS NULL OR loan_state != 0) AND list_id IS NOT NULL')
      .orderBy('nft.created_at', 'DESC');

    if (collectionIdArr && collectionIdArr.length > 0) {
      qb.andWhere('collection.id IN(:...collection_id)', { collection_id: collectionIdArr });
    }

    if (min && max && currency !== undefined) {
      qb.andWhere('list_loan_amount BETWEEN :min AND :max', { min, max }).andWhere(
        'list_loan_type = :currency',
        { currency }
      );
    }

    const [results, entities] = await paginateRawAndEntities(qb, options);

    if (results && results.items) {
      for (const nft of results.items) {
        const entity = entities.find((e) => e['nft_id'] === nft.id);
        const list = await this.listRepository.findOne({ id: entity['list_id'] });
        const offer = await this.offerRepository.findOne({ id: entity['offer_id'] });
        nft.list = list ? list : null;
        nft.offer = offer ? offer : null;
      }
    }
    return results;
  }

  async getNft(collectionAddress: string, tokenId: string) {
    const nft = await this.nftRepository.findOne({
      relations: ['owner', 'collection'],
      where: {
        collection: { address: collectionAddress },
        tokenId
      }
    });
    return nft ? nft : null;
  }

  async deleteNft(id: string | number) {
    await this.nftRepository.update(id, { deletedAt: new Date() });
    const updatedNft = await this.nftRepository.findOne(id, { withDeleted: true });
    if (updatedNft) {
      return { id: updatedNft.id };
    }
    throw new HttpException('NFT not found', HttpStatus.NOT_FOUND);
  }
}
