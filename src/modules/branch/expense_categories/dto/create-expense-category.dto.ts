import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateExpenseCategoryDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  code?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
