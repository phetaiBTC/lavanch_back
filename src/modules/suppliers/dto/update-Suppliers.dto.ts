import { PartialType } from '@nestjs/mapped-types';
import { CreateSuppliersDto } from './create-Suppliers.dto';
export class UpdateSuppliersDto extends PartialType(CreateSuppliersDto) {}
