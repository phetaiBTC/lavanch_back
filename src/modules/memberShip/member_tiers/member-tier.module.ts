import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberTierRepositoryImpl } from './infrastructure/member-tier.repository.impl';
import { MemberTierController } from './member-tier.controller';
import { MEMBER_TIER_REPOSITORY } from './domain/member-tier.repository';
import { MemberTiersOrm } from 'src/database/typeorm/member_tiers.orm-entity';
import { CreateMemberTierUseCase } from './application/commands/create-member-tier.usecase';
import { UpdateMemberTierUseCase } from './application/commands/update-member-tier.usecase';
import { HardDeleteMemberTierUseCase } from './application/commands/hard-delete-member-tier.usecase';
import { SoftDeleteMemberTierUseCase } from './application/commands/soft-delete-member-tier.usecase';
import { RestoreMemberTierUseCase } from './application/commands/restore-member-tier.usecase';
import { FindOneMemberTierUseCase } from './application/queries/findOne-member-tier.usecase';
import { FindAllMemberTierUseCase } from './application/queries/find-member-tier.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([MemberTiersOrm])],
  controllers: [MemberTierController],
  providers: [
    { provide: MEMBER_TIER_REPOSITORY, useClass: MemberTierRepositoryImpl },
    CreateMemberTierUseCase,
    UpdateMemberTierUseCase,
    HardDeleteMemberTierUseCase,
    SoftDeleteMemberTierUseCase,
    RestoreMemberTierUseCase,
    FindOneMemberTierUseCase,
    FindAllMemberTierUseCase,
  ],
  exports: [MEMBER_TIER_REPOSITORY, FindOneMemberTierUseCase, FindAllMemberTierUseCase],
})
export class MemberTierModule {}
