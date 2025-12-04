import { 
  IsString, 
  IsNotEmpty, 
  Length, 
  IsOptional, 
  IsBoolean 
} from 'class-validator';

export class CreateExpenseCategoryDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  name: string;

  @IsString()
  @IsOptional()
  @Length(1, 50)
  code?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
}

export class UpdateExpenseCategoryDto {
  @IsString()
  @IsOptional()
  @Length(1, 255)
  name?: string;

  @IsString()
  @IsOptional()
  @Length(1, 50)
  code?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
}