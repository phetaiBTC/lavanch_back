
  import { IsNotEmpty, IsString } from 'class-validator';
  export class CreateStock_transfer_itemsDto {
    @IsString()
  @IsNotEmpty()
  name: string;
}