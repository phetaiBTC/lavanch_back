
  import { IsNotEmpty, IsString } from 'class-validator';
  export class CreateInbound_ordersDto {
    @IsString()
  @IsNotEmpty()
  name: string;
}