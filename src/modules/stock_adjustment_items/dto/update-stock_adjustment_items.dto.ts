
  import { PartialType } from '@nestjs/mapped-types';
  import { CreateStock_adjustment_itemsDto } from './create-stock_adjustment_items.dto';
  export class UpdateStock_adjustment_itemsDto extends PartialType(CreateStock_adjustment_itemsDto) {}