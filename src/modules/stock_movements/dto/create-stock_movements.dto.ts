
  import { IsNotEmpty, IsString } from 'class-validator';
  export class CreateStock_movementsDto {
    @IsString()
  @IsNotEmpty()
  name: string;
}