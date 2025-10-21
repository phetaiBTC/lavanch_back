import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsBoolean,
  IsNumber,
} from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  parentId?: number;

  @IsOptional()
  @IsNumber({}, { each: true })
  childrenIds?: number[];

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}
