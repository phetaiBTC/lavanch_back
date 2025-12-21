
  import { IsNotEmpty, IsString } from 'class-validator';
  export class CreateInbound_order_itemsDto {
    @IsString()
  @IsNotEmpty()
  name: string;
}