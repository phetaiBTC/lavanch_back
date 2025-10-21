import { IsNotEmpty, IsString } from 'class-validator';

export class CreateShiftsDto {
  @IsNotEmpty()
  @IsString()
  start_time: string;

  @IsNotEmpty()
  @IsString()
  end_time: string;
}
