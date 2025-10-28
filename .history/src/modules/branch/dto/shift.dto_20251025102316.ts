import { IsString, IsNotEmpty, Length } from 'class-validator';

export class CreateShiftDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  start_time: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  end_time: string;
}

export class UpdateShiftDto {
  @IsString()
  @Length(1, 50)
  start_time?: string;

  @IsString()
  @Length(1, 50)
  end_time?: string;
}