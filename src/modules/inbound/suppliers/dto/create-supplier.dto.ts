import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSupplierDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @IsString()
  @IsNotEmpty()
  readonly phone: string;
  @IsString()
  @IsNotEmpty()
  readonly address: string;
  @IsString()
  @IsNotEmpty()
  readonly email: string;
  @IsBoolean()
  @IsNotEmpty()
  readonly is_active: boolean;
  @IsString()
  @IsNotEmpty()
  readonly contact_person: string;
  @IsNumber()
  @IsNotEmpty()
  readonly vaillage_id?: number;
}
