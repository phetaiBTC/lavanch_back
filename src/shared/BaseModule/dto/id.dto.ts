import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';

export class IdArrayDto {
  @IsArray()
  @IsNotEmpty()
  @IsNumber({}, { each: true })
  ids: number[];
}
