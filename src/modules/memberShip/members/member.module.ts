import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberRepositoryImpl } from './infrastructure/member.repository.impl';
import { MemberController } from './member.controller';
import { MEMBER_REPOSITORY } from './domain/member.repository';
import { MembersOrm } from 'src/database/typeorm/members.orm-entity';
import { MemberTiersOrm } from 'src/database/typeorm/member_tiers.orm-entity';
import { CreateMemberUseCase } from './application/commands/create-member.usecase';
import { UpdateMemberUseCase } from './application/commands/update-member.usecase';
import { HardDeleteMemberUseCase } from './application/commands/hard-delete-member.usecase';
import { SoftDeleteMemberUseCase } from './application/commands/soft-delete-member.usecase';
import { RestoreMemberUseCase } from './application/commands/restore-member.usecase';
import { FindOneMemberUseCase } from './application/queries/findOne-member.usecase';
import { FindAllMemberUseCase } from './application/queries/find-member.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([MembersOrm, MemberTiersOrm])],
  controllers: [MemberController],
  providers: [
    { provide: MEMBER_REPOSITORY, useClass: MemberRepositoryImpl },
    CreateMemberUseCase,
    UpdateMemberUseCase,
    HardDeleteMemberUseCase,
    SoftDeleteMemberUseCase,
    RestoreMemberUseCase,
    FindOneMemberUseCase,
    FindAllMemberUseCase,
  ],
  exports: [MEMBER_REPOSITORY, FindOneMemberUseCase, FindAllMemberUseCase],
})
export class MemberModule {}
