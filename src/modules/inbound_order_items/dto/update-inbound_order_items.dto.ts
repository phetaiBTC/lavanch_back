
  import { PartialType } from '@nestjs/mapped-types';
  import { CreateInbound_order_itemsDto } from './create-inbound_order_items.dto';
  export class UpdateInbound_order_itemsDto extends PartialType(CreateInbound_order_itemsDto) {}