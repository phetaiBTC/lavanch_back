import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
export class UpdateCategoryDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsNumber()
  parentId?: number;

  @IsOptional()
  @IsNumber({}, { each: true })
  childrenIds?: number[];
}
