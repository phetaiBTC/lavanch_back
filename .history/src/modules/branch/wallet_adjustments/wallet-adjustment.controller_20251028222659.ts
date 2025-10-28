import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Query,
} from '@nestjs/common';
import { CreateWalletAdjustmentDto } from './dto/create-wallet-adjustment.dto';
import { ApproveAdjustmentDto } from './dto/approve-adjustment.dto';
import {
  CreateDepositAdjustmentDto,
  CreateWithdrawAdjustmentDto,
  CreateFoundAdjustmentDto,
  CreateLostAdjustmentDto,
} from './dto/specific-adjustment.dto';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { CreateWalletAdjustmentUseCase } from './application/commands/create-wallet-adjustment.usecase';
import { CreateWalletAdjustmentDispositUseCase } from './application/commands/create-wallet-adjustment-disposit.usecase';
import { CreateWalletAdjustmentWithdrawUseCase } from './application/commands/create-wallet-adjustment-withdraw.usecase';
import { CreateWalletAdjustmentFoundUseCase } from './application/commands/create-wallet-adjustment-found.usecase';
import { CreateWalletAdjustmentLostUseCase } from './application/commands/create-wallet-adjustment-lost.usecase';
import { ApproveAdjustmentUseCase } from './application/commands/approve-adjustment.usecase';
import { FindOneWalletAdjustmentUseCase } from './application/queries/findOne-wallet-adjustment.usecase';
import { FindAllWalletAdjustmentUseCase } from './application/queries/find-wallet-adjustment.usecase';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
import { WalletAdjustmentMapper } from './infrastructure/wallet-adjustment.mapper';
import { WalletAdjustmentResponse } from './interface/wallet-adjustment.interface';

@Controller('wallet-adjustments')
export class WalletAdjustmentController {
  constructor(
    private readonly createWalletAdjustmentUseCase: CreateWalletAdjustmentUseCase,
    private readonly createDepositAdjustmentUseCase: CreateWalletAdjustmentDispositUseCase,
    private readonly createWithdrawAdjustmentUseCase: CreateWalletAdjustmentWithdrawUseCase,
    private readonly createFoundAdjustmentUseCase: CreateWalletAdjustmentFoundUseCase,
    private readonly createLostAdjustmentUseCase: CreateWalletAdjustmentLostUseCase,
    private readonly approveAdjustmentUseCase: ApproveAdjustmentUseCase,
    private readonly findOneWalletAdjustmentUseCase: FindOneWalletAdjustmentUseCase,
    private readonly findAllWalletAdjustmentUseCase: FindAllWalletAdjustmentUseCase,
  ) {}

  /**
   * Create a new wallet adjustment (status: PENDING)
   * Does not affect wallet balance until approved
   */
  @Post()
  async create(
    @Body() dto: CreateWalletAdjustmentDto,
  ): Promise<WalletAdjustmentResponse> {
    return WalletAdjustmentMapper.toResponse(
      await this.createWalletAdjustmentUseCase.execute(dto),
    );
  }

  /**
   * Get all adjustments
   */
  @Get()
  async findAll(
    @Query() query: PaginationDto,
  ): Promise<PaginatedResponse<WalletAdjustmentResponse>> {
    return WalletAdjustmentMapper.toResponseList(
      await this.findAllWalletAdjustmentUseCase.execute(query),
    );
  }

  /**
   * Get single adjustment by ID
   */
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<WalletAdjustmentResponse> {
    return WalletAdjustmentMapper.toResponse(
      await this.findOneWalletAdjustmentUseCase.execute(id),
    );
  }

  /**
   * Approve or reject an adjustment
   * When approved: Creates wallet transaction and updates branch balance
   * When rejected: Just updates status
   */
  @Patch(':id/approve')
  async approve(
    @Param('id') id: number,
    @Body() dto: ApproveAdjustmentDto,
  ): Promise<WalletAdjustmentResponse> {
    return WalletAdjustmentMapper.toResponse(
      await this.approveAdjustmentUseCase.execute(+id, dto),
    );
  }
}
