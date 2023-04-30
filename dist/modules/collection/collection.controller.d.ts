import { CollectionService } from './collection.service';
import { CreateCollectionDto } from './dto/createCollectionDto';
export declare class CollectionController {
    private collectionService;
    constructor(collectionService: CollectionService);
    create(request: any, createCollectionDto: CreateCollectionDto): Promise<import("./entities/collection.entity").Collection>;
    getTransactionByAction(page?: number, limit?: number): Promise<import("nestjs-typeorm-paginate").Pagination<import("./entities/collection.entity").Collection, import("nestjs-typeorm-paginate").IPaginationMeta>>;
}
