import { IsArray, IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RegisterUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  confirm_password:string

  @IsArray()
  @IsNumber({}, { each: true })
  roles: number[]

  @IsArray()
  @IsNumber({}, { each: true })
  permissions: number[]
}
