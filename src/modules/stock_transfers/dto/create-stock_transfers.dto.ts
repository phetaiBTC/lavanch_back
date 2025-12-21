
  import { IsNotEmpty, IsString } from 'class-validator';
  export class CreateStock_transfersDto {
    @IsString()
  @IsNotEmpty()
  name: string;
}