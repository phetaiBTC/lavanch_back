import {
  IsNotEmpty,
  IsNumber,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';
import { PointNameCode } from 'src/shared/enum/point-name-code';

export class CreatePointDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  points_multiplier?: number;

  @IsNotEmpty()
  @IsEnum(PointNameCode)
  name_code: PointNameCode;
}
