
  import { PartialType } from '@nestjs/mapped-types';
  import { CreateStock_transfer_itemsDto } from './create-stock_transfer_items.dto';
  export class UpdateStock_transfer_itemsDto extends PartialType(CreateStock_transfer_itemsDto) {}