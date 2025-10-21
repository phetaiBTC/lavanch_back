import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
export class ActiveDto {
  @IsNotEmpty()
  @IsBoolean()
  is_active: boolean;
}
