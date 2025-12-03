import { IsArray, IsNumber } from 'class-validator';

export class DeleteMultipleBranchesDto {
  @IsArray()
  @IsNumber({}, { each: true })
  ids: number[];
}