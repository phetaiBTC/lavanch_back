import { IsString, IsEmail, IsOptional, IsEnum, IsDateString, IsNumber } from 'class-validator';

export class CreateMemberDto {
  @IsString()
  name: string;

  @IsString()
  phone: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsDateString()
  birthday?: string;

  @IsOptional()
  @IsEnum(['MALE', 'FEMALE', 'OTHER'])
  gender?: string;

  @IsOptional()
  @IsNumber()
  tier_id?: number;

  @IsOptional()
  @IsNumber()
  registered_branch_id?: number;
}
