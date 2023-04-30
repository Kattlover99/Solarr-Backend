import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';

import { CreateListDto } from './dto/createList.dto';
import { List } from './entities/list.entity';
import { UpdateListDto } from './dto/updateList.dto';
import { ListByAccountDto } from './dto/listByAccountDto';
import { Collection } from '../collection/entities/collection.entity';
import { Offer } from '../offer/entities/offer.entity';
import { GetListDto } from './dto/getList.dto';
import { NftService } from '../nft/nft.service';

@Injectable()
export class ListService {
  constructor(
    @InjectRepository(List) private listRepository: Repository<List>,
    @InjectRepository(Offer) private offerRepository: Repository<Offer>,
    @InjectRepository(Collection) private collectionRepository: Repository<Collection>,
    private nftService: NftService
  ) {}

  async createList(createListDto: CreateListDto): Promise<List> {
    const {
      name,
      tokenId,
      state,
      metadata,
      collectionFloor,
      bankValuation,
      ownerId,
      collectionAddress,
      loanAmount,
      loanType,
      period,
      apr,
      borrowerId
    } = createListDto;
    await this.nftService.createNft({
      name,
      tokenId,
      state,
      metadata,
      collectionFloor,
      bankValuation,
      ownerId,
      collectionAddress
    });
    const list = new List();
    if (createListDto) {
      list.loanAmount = loanAmount;
      list.loanType = loanType;
      list.period = period;
      list.apr = apr;
      list.borrowerId = borrowerId;
      list.collectionAddress = collectionAddress;
      list.tokenId = tokenId;
      list.metadata = metadata;
    }
    await this.listRepository.save(list);
    return list;
  }

  async getLists(
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
    getListDto: GetListDto
  ) {
    let lists = await this.listRepository
      .createQueryBuilder('list')
      .select()
      .where('deleted_at IS NULL')
      .andWhere('list.collection_address like :collection_address', {
        collection_address: `%${collection}%`
      })
      .andWhere('amount >= :amount', {
        amount: minAmount
      })
      .andWhere('amount <= :amount', {
        amount: maxAmount
      });
    if (orderByDate === 1 || orderByDate === 2) {
      lists = lists.addOrderBy('updatedAt', orderByDate === 1 ? 'ASC' : 'DESC');
    }
    if (orderByAmount === 1 || orderByAmount === 2) {
      lists = lists.addOrderBy('amount', orderByAmount === 1 ? 'ASC' : 'DESC');
    }
    if (orderByCollection === 1 || orderByCollection === 2) {
      lists = lists.addOrderBy('collectionAddress', orderByCollection === 1 ? 'ASC' : 'DESC');
    }
    const results = await paginate(lists, { page, limit });

    if (results && results.items) {
      for (const list of results.items) {
        const offer = await this.offerRepository.findOne({
          where: { lenderId: getListDto.lenderId }
        });
        list.isOffered = !!offer;
      }
      return results;
    }

    return results ? results : null;
  }

  async getListByAccount(listByAccountDto: ListByAccountDto) {
    const listData = [];

    await Promise.all(
      listByAccountDto.nfts.map(async (el: { collection: string; tokenId: string }) => {
        const list = await this.listRepository.findOne({
          where: {
            borrowerId: listByAccountDto.borrowerId,
            collectionAddress: el.collection,
            tokenId: el.tokenId
          }
        });
        const collection = await this.collectionRepository.findOne({
          where: {
            address: el.collection,
            whitelisted: true
            // tokenId: el.tokenId
          }
        });
        listData.push({
          list: list ? list : null,
          collection: el.collection,
          tokenId: el.tokenId,
          isWhitelisted: !!collection
        });
      })
    );

    if (listByAccountDto.checkOwnership) {
      const allListsOfAccount = await this.listRepository.find({
        where: { borrowerId: listByAccountDto.borrowerId }
      });

      await Promise.all(
        allListsOfAccount.map(async (listBE) => {
          const found = listData.find(
            (listItem) =>
              listItem.list &&
              listItem.list.tokenId === listBE.tokenId &&
              listItem.list.collectionAddress === listBE.collectionAddress
          );
          if (!found) {
            await this.listRepository.update(listBE.id, { deletedAt: new Date() });
            const nft = await this.nftService.getNft(listBE.collectionAddress, listBE.tokenId);
            if (nft) {
              await this.nftService.deleteNft(nft.id);
            }
          }
        })
      );
    }
    return listData;
  }

  async updateList(id: string, updateListDto: UpdateListDto) {
    await this.listRepository.update(id, updateListDto);
    const updatedList = await this.listRepository.findOne(id);
    if (updatedList) {
      return updatedList;
    }
    throw new HttpException('List not found', HttpStatus.NOT_FOUND);
  }

  async deleteList(id: string) {
    await this.listRepository.update(id, { deletedAt: new Date() });
    const updatedList = await this.listRepository.findOne(id, { withDeleted: true });
    if (updatedList) {
      return { id: updatedList.id };
    }
    throw new HttpException('List not found', HttpStatus.NOT_FOUND);
  }
}
