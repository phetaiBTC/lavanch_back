import { IsNotEmpty, IsString, IsOptional, IsNumber, IsBoolean, Matches, Length } from 'class-validator';

export class CreateBranchDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsNumber()
  village_id?: number;

  @IsOptional()
  @IsString()
  @Matches(/^\+?\d{10,11}$/, { message: 'Phone number must be 10-11 digits, optionally starting with +' })
  phone?: string;

  @IsOptional()
  @IsString()
  facebook?: string;

  @IsOptional()
  @IsString()
  tiktok?: string;

  @IsOptional()
  @IsNumber()
  shifts_id?: number;

  // @IsOptional()
  // @IsBoolean()
  // is_active?: boolean;
}
