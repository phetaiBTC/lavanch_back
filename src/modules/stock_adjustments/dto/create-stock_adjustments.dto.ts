
  import { IsNotEmpty, IsString } from 'class-validator';
  export class CreateStock_adjustmentsDto {
    @IsString()
  @IsNotEmpty()
  name: string;
}