import { CreateNftDto } from 'src/modules/nft/dto/createNft.dto';
export declare class CreateListDto extends CreateNftDto {
    loanAmount: number;
    loanType: boolean;
    period: number;
    apr: number;
    borrowerId: number;
    collectionAddress: string;
    tokenId: string;
    metadata: string;
}
