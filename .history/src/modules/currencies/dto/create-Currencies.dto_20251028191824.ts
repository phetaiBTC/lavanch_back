import { IsNotEmpty, IsString } from 'class-validator';
export class CreateCurrenciesDto {
  @IsNotEmpty()
  @IsString()
  code: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  symbol: string;
}
