import { IsOptional, IsString } from 'class-validator';

export class UpdateShiftsDto {
  @IsOptional()
  @IsString()
  start_time?: string;

  @IsOptional()
  @IsString()
  end_time?: string;
}
