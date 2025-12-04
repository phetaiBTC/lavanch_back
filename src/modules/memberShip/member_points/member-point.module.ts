import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberPointsOrm } from 'src/database/typeorm/member_points.orm-entity';
import { MemberPointController } from './member-point.controller';
import { MEMBER_POINT_REPOSITORY } from './domain/member-point.repository';
import { MemberPointRepositoryImpl } from './infrastructure/member-point.repository.impl';
import { CreateMemberPointUseCase } from './application/commands/create-member-point.usecase';
import { AddPointUseCase } from './application/commands/add-point.usecase';
import { SubtractPointUseCase } from './application/commands/subtract-point.usecase';
import { FindAllMemberPointUseCase } from './application/queries/findAll-member-point.usecase';
import { FindOneMemberPointUseCase } from './application/queries/findOne-member-point.usecase';
import { MemberTransactionModule } from '../member_transactions/member-transaction.module';
import { TransactionModule } from 'src/database/transaction/transaction.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MemberPointsOrm]),
    MemberTransactionModule, // Only needed for SubtractPointUseCase
    TransactionModule, // Only needed for SubtractPointUseCase
  ],
  controllers: [MemberPointController],
  providers: [
    {
      provide: MEMBER_POINT_REPOSITORY,
      useClass: MemberPointRepositoryImpl,
    },
    CreateMemberPointUseCase,
    AddPointUseCase,
    SubtractPointUseCase,
    FindAllMemberPointUseCase,
    FindOneMemberPointUseCase,
  ],
  exports: [MEMBER_POINT_REPOSITORY],
})
export class MemberPointModule {}
