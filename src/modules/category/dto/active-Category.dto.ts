import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
export class ActiveCategoryDto {
  @IsNotEmpty()
  @IsBoolean()
  is_active: boolean;
}
