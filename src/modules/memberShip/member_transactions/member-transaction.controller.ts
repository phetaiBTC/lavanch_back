import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/AuthGuard';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { FindAllMemberTransactionUseCase } from './application/queries/findAll-member-transaction.usecase';
import { FindOneMemberTransactionUseCase } from './application/queries/findOne-member-transaction.usecase';
import { FindMemberTransactionsByMemberUseCase } from './application/queries/findByMember-member-transaction.usecase';
import { MemberTransactionMapper } from './infrastructure/member-transaction.mapper';

@Controller('member-transactions')
@UseGuards(JwtAuthGuard)
export class MemberTransactionController {
  constructor(
    private readonly findAllUseCase: FindAllMemberTransactionUseCase,
    private readonly findOneUseCase: FindOneMemberTransactionUseCase,
    private readonly findByMemberUseCase: FindMemberTransactionsByMemberUseCase,
  ) {}

  @Get()
  async findAll(@Query() query: PaginationDto) {
    const result = await this.findAllUseCase.execute(query);
    return {
      ...result,
      data: result.data.map((transaction) => MemberTransactionMapper.toResponse(transaction)),
    };
  }

  @Get('member/:memberId')
  async findByMember(
    @Param('memberId') memberId: string,
    @Query() query: PaginationDto,
  ) {
    const result = await this.findByMemberUseCase.execute(Number(memberId), query);
    return {
      ...result,
      data: result.data.map((transaction) => MemberTransactionMapper.toResponse(transaction)),
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const transaction = await this.findOneUseCase.execute(Number(id));
    return transaction ? MemberTransactionMapper.toResponse(transaction) : null;
  }
}
