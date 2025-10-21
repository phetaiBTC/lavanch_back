import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { CreateWalletTransactionDto } from './dto/create-wallet-transaction.dto';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { CreateWalletTransactionUseCase } from './application/commands/create-wallet-transaction.usecase';
import { FindOneWalletTransactionUseCase } from './application/queries/findOne-wallet-transaction.usecase';
import { FindAllWalletTransactionUseCase } from './application/queries/find-wallet-transaction.usecase';
import { FindTransactionsByBranchUseCase } from './application/queries/find-transactions-by-branch.usecase';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
import { WalletTransactionMapper } from './infrastructure/wallet-transaction.mapper';
import { WalletTransactionResponse } from './interface/wallet-transaction.interface';

@Controller('wallet-transactions')
export class WalletTransactionController {
  constructor(
    private readonly createWalletTransactionUseCase: CreateWalletTransactionUseCase,
    private readonly findOneWalletTransactionUseCase: FindOneWalletTransactionUseCase,
    private readonly findAllWalletTransactionUseCase: FindAllWalletTransactionUseCase,
    private readonly findTransactionsByBranchUseCase: FindTransactionsByBranchUseCase,
  ) {}

  @Post()
  async create(
    @Body() dto: CreateWalletTransactionDto,
  ): Promise<WalletTransactionResponse> {
    return WalletTransactionMapper.toResponse(
      await this.createWalletTransactionUseCase.execute(dto),
    );
  }

  @Get()
  async findAll(
    @Query() query: PaginationDto,
  ): Promise<PaginatedResponse<WalletTransactionResponse>> {
    return WalletTransactionMapper.toResponseList(
      await this.findAllWalletTransactionUseCase.execute(query),
    );
  }

  @Get('branch/:branchId')
  async findByBranch(
    @Param('branchId') branchId: number,
    @Query() query: PaginationDto,
  ): Promise<PaginatedResponse<WalletTransactionResponse>> {
    return WalletTransactionMapper.toResponseList(
      await this.findTransactionsByBranchUseCase.execute(+branchId, query),
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<WalletTransactionResponse> {
    return WalletTransactionMapper.toResponse(
      await this.findOneWalletTransactionUseCase.execute(id),
    );
  }
}
