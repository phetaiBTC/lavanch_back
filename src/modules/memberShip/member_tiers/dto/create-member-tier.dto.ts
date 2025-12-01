import { IsString, IsNumber, IsBoolean, IsOptional, Min } from 'class-validator';

export class CreateMemberTierDto {
  @IsString()
  name: string;

  @IsNumber()
  @Min(0)
  min_spending: number;

  @IsNumber()
  @Min(0)
  discount_percent: number;

  @IsNumber()
  @Min(0)
  points_multiplier: number;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}
