import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { CreateCollectionDto } from './dto/createCollectionDto';
import { Collection } from './entities/collection.entity';
export declare class CollectionService {
    private collectionRepository;
    constructor(collectionRepository: Repository<Collection>);
    createCollection(createCollectionDto: CreateCollectionDto): Promise<Collection>;
    getCollections(options: IPaginationOptions): Promise<import("nestjs-typeorm-paginate").Pagination<Collection, import("nestjs-typeorm-paginate").IPaginationMeta>>;
    getCollectionbyAddress(name: string, address: string): Promise<Collection>;
}
