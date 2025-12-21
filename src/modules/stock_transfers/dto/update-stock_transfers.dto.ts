
  import { PartialType } from '@nestjs/mapped-types';
  import { CreateStock_transfersDto } from './create-stock_transfers.dto';
  export class UpdateStock_transfersDto extends PartialType(CreateStock_transfersDto) {}