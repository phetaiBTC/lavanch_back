
  import { PartialType } from '@nestjs/mapped-types';
  import { CreateStock_adjustmentsDto } from './create-stock_adjustments.dto';
  export class UpdateStock_adjustmentsDto extends PartialType(CreateStock_adjustmentsDto) {}