import { IsNotEmpty } from "class-validator";
import { CreateProductLotDto } from "./create-ProductLot.dto";

export class UpdateProductLotDto extends CreateProductLotDto {
  @IsNotEmpty()
  id: number;
}