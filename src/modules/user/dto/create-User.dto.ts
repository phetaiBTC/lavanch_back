import { IsArray, IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  // @IsNotEmpty()
  // @IsString()
  // confirm_password: string;

  @IsBoolean()
  is_verified: boolean;

  @IsArray()
  @IsNumber({}, { each: true })
  roles: number[];

  @IsArray()
  @IsNumber({}, { each: true })
  permissions: number[];
}
