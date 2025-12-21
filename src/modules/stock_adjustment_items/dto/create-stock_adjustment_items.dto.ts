
  import { IsNotEmpty, IsString } from 'class-validator';
  export class CreateStock_adjustment_itemsDto {
    @IsString()
  @IsNotEmpty()
  name: string;
}