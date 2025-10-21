import { IsBoolean, IsNotEmpty } from 'class-validator';
export class ActiveUnitDto {
  @IsNotEmpty()
  @IsBoolean()
  is_active: boolean;
}
