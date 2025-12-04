import { Optional } from '@nestjs/common';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateSuppliersDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @MaxLength(255)
  email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(11)
  phone: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  contact_person: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  address: string;

  @Optional()
  @IsBoolean()
  is_active: boolean;

  @IsNumber()
  @IsOptional()
  village_id: number;
}
