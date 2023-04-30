import { CoreEntity } from 'src/core/typeorm/core.entity';
import { List } from 'src/modules/list/entities/list.entity';
export declare class ListHistory extends CoreEntity {
    action: number;
    listId: number;
    list: List;
}
