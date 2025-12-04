import { IsArray, IsNotEmpty, ArrayMinSize } from 'class-validator';

export class DeleteMultipleExpenseCategoriesDto {
  @IsArray()
  @IsNotEmpty()
  @ArrayMinSize(1)
  ids: number[];
}
