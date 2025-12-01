import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberTransactionsOrm } from 'src/database/typeorm/member_transactions.orm-entity';
import { MemberTransactionController } from './member-transaction.controller';
import { MEMBER_TRANSACTION_REPOSITORY } from './domain/member-transaction.repository';
import { MemberTransactionRepositoryImpl } from './infrastructure/member-transaction.repository.impl';
import { MemberTransactionMapper } from './infrastructure/member-transaction.mapper';
import { FindAllMemberTransactionUseCase } from './application/queries/findAll-member-transaction.usecase';
import { FindOneMemberTransactionUseCase } from './application/queries/findOne-member-transaction.usecase';
import { FindMemberTransactionsByMemberUseCase } from './application/queries/findByMember-member-transaction.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([MemberTransactionsOrm])],
  controllers: [MemberTransactionController],
  providers: [
    {
      provide: MEMBER_TRANSACTION_REPOSITORY,
      useClass: MemberTransactionRepositoryImpl,
    },
    MemberTransactionMapper,
    FindAllMemberTransactionUseCase,
    FindOneMemberTransactionUseCase,
    FindMemberTransactionsByMemberUseCase,
  ],
  exports: [MEMBER_TRANSACTION_REPOSITORY, MemberTransactionMapper],
})
export class MemberTransactionModule {}
