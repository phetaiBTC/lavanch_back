import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { CreatePointDto } from './create-Point.dto';
import { PartialType } from '@nestjs/mapped-types';
export class UpdatePointDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  points_multiplier?: number;
}
