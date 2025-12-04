import { IsNumber, Min, IsOptional, IsString } from 'class-validator';

export class AddPointDto {
  @IsNumber()
  member_id: number;

  @IsNumber()
  branch_id: number;

  @IsNumber()
  @Min(0)
  points: number;

  @IsOptional()
  @IsNumber()
  sale_id?: number;

  @IsOptional()
  @IsNumber()
  total_amount?: number;

  @IsOptional()
  @IsString()
  notes?: string;
}
