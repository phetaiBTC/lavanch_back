
  import { IsNotEmpty, IsString } from 'class-validator';
  export class CreateBranch_stocksDto {
    @IsString()
  @IsNotEmpty()
  name: string;
}