
  import { PartialType } from '@nestjs/mapped-types';
  import { CreateInbound_ordersDto } from './create-inbound_orders.dto';
  export class UpdateInbound_ordersDto extends PartialType(CreateInbound_ordersDto) {}