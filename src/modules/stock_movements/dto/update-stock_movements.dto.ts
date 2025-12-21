
  import { PartialType } from '@nestjs/mapped-types';
  import { CreateStock_movementsDto } from './create-stock_movements.dto';
  export class UpdateStock_movementsDto extends PartialType(CreateStock_movementsDto) {}