import { IsArray, IsNotEmpty, ArrayMinSize } from 'class-validator';

export class DeleteMultipleBranchesDto {
  @IsArray()
  @IsNotEmpty()
  @ArrayMinSize(1)
  ids: number[];
}
