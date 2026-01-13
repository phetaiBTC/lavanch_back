import { IsInt, IsNotEmpty, IsPositive } from 'class-validator';

export class ReceiveInboundOrderItemDto {
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  received_quantity: number;
}
