import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsInt, IsNotEmpty, IsOptional, IsPositive, ValidateNested } from 'class-validator';

class ReceiveInboundOrderItemDto {
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  received_quantity: number;

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  itemId: number;

  @IsInt()
  @IsPositive()
  @IsOptional()
  product_lot_id?: number;
}

export class ReceiveInboundOrderDto {
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => ReceiveInboundOrderItemDto)
  readonly items: ReceiveInboundOrderItemDto[];
}
