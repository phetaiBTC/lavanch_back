
  import { PartialType } from '@nestjs/mapped-types';
  import { CreateBranch_stocksDto } from './create-branch_stocks.dto';
  export class UpdateBranch_stocksDto extends PartialType(CreateBranch_stocksDto) {}