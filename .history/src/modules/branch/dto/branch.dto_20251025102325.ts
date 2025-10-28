import { 
  IsString, 
  IsNotEmpty, 
  Length, 
  IsOptional, 
  IsNumber, 
  IsBoolean, 
  IsPositive 
} from 'class-validator';

export class CreateBranchDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  name: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsNumber()
  @IsOptional()
  village_id?: number;

  @IsString()
  @IsOptional()
  @Length(1, 20)
  phone?: string;

  @IsString()
  @IsOptional()
  @Length(1, 255)
  facebook?: string;

  @IsString()
  @IsOptional()
  @Length(1, 255)
  tiktok?: string;

  @IsNumber()
  @IsOptional()
  shifts_id?: number;

  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
}

export class UpdateBranchDto {
  @IsString()
  @IsOptional()
  @Length(1, 255)
  name?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsNumber()
  @IsOptional()
  village_id?: number;

  @IsString()
  @IsOptional()
  @Length(1, 20)
  phone?: string;

  @IsString()
  @IsOptional()
  @Length(1, 255)
  facebook?: string;

  @IsString()
  @IsOptional()
  @Length(1, 255)
  tiktok?: string;

  @IsNumber()
  @IsOptional()
  shifts_id?: number;

  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
}

export class BranchBalanceDto {
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  branch_id: number;
}