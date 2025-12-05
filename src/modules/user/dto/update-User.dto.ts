import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-User.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
