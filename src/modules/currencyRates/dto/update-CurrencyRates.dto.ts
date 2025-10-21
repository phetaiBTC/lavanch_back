import { PartialType } from '@nestjs/mapped-types';
import { CreateCurrencyRatesDto } from './create-CurrencyRates.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateCurrencyRatesDto extends PartialType(
  CreateCurrencyRatesDto,
) {
  @IsNumber()
  @IsNotEmpty()
  from_currency_id: number;

  @IsNumber()
  @IsNotEmpty()
  to_currency_id: number;
}
