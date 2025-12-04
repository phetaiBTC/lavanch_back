import { PartialType } from '@nestjs/mapped-types';
import { CreateCurrenciesDto } from './create-Currencies.dto';
export class UpdateCurrenciesDto extends PartialType(CreateCurrenciesDto) {}
