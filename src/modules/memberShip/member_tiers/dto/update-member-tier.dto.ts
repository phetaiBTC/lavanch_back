import { PartialType } from '@nestjs/mapped-types';
import { CreateMemberTierDto } from './create-member-tier.dto';

export class UpdateMemberTierDto extends PartialType(CreateMemberTierDto) {}
