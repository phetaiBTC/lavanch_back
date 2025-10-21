import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';
export class CreateCurrencyRatesDto {
  @IsNumber()
  @IsNotEmpty()
  from_currency_id: number;

  @IsNumber()
  @IsNotEmpty()
  to_currency_id: number;

  @IsNumber()
  @IsNotEmpty()
  rate: number;

  @IsDate()
  @IsNotEmpty()
  rate_date: Date;
}
