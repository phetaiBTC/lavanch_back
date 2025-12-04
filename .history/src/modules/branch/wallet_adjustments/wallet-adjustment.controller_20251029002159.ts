import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateWalletAdjustmentDto } from './dto/create-wallet-adjustment.dto';
import { ApproveAdjustmentDto } from './dto/approve-adjustment.dto';
import {
  CreateDepositAdjustmentDto,
  CreateWithdrawAdjustmentDto,
  CreateFoundAdjustmentDto,
  CreateLostAdjustmentDto,
} from './dto/specific-adjustment.dto';
import { CreateWalletTransferDto } from './dto/create-wallet-transfer.dto';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { CreateWalletAdjustmentDispositUseCase } from './application/commands/create-wallet-adjustment-disposit.usecase';
import { CreateWalletAdjustmentWithdrawUseCase } from './application/commands/create-wallet-adjustment-withdraw.usecase';
import { CreateWalletAdjustmentFoundUseCase } from './application/commands/create-wallet-adjustment-found.usecase';
import { CreateWalletAdjustmentLostUseCase } from './application/commands/create-wallet-adjustment-lost.usecase';
import { CreateWalletAdjustmentTransferUseCase } from './application/commands/create-wallet-adjustment-transfer.usecase';
import { ApproveAdjustmentUseCase } from './application/commands/approve-adjustment.usecase';
import { FindOneWalletAdjustmentUseCase } from './application/queries/findOne-wallet-adjustment.usecase';
import { FindAllWalletAdjustmentUseCase } from './application/queries/find-wallet-adjustment.usecase';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
import { WalletAdjustmentMapper } from './infrastructure/wallet-adjustment.mapper';
import { WalletAdjustmentResponse } from './interface/wallet-adjustment.interface';
import { JwtAuthGuard } from 'src/guards/AuthGuard';
import { CurrentUser } from 'src/shared/decorator/user.decorator';

@Controller('wallet-adjustments')
@UseGuards(JwtAuthGuard)
export class WalletAdjustmentController {
  constructor(
    private readonly createDepositAdjustmentUseCase: CreateWalletAdjustmentDispositUseCase,
    private readonly createWithdrawAdjustmentUseCase: CreateWalletAdjustmentWithdrawUseCase,
    private readonly createFoundAdjustmentUseCase: CreateWalletAdjustmentFoundUseCase,
    private readonly createLostAdjustmentUseCase: CreateWalletAdjustmentLostUseCase,
    private readonly createTransferAdjustmentUseCase: CreateWalletAdjustmentTransferUseCase,
    private readonly approveAdjustmentUseCase: ApproveAdjustmentUseCase,
    private readonly findOneWalletAdjustmentUseCase: FindOneWalletAdjustmentUseCase,
    private readonly findAllWalletAdjustmentUseCase: FindAllWalletAdjustmentUseCase,
  ) {}


  /**
   * Create a deposit adjustment (Immediately adds money to wallet)
   */
  @Post('deposit')
  async createDeposit(
    @Body() dto: CreateDepositAdjustmentDto,
    @CurrentUser() user: any,
  ): Promise<WalletAdjustmentResponse> {
    const adjustmentDto: CreateWalletAdjustmentDto = {
      ...dto,
      adjustment_type: 'ADD' as any,
      reason: 'DEPOSIT' as any,
    };
    return WalletAdjustmentMapper.toResponse(
      await this.createDepositAdjustmentUseCase.execute(adjustmentDto, user.id),
    );
  }

  /**
   * Create a withdraw adjustment (Immediately removes money from wallet)
   */
  @Post('withdraw')
  async createWithdraw(
    @Body() dto: CreateWithdrawAdjustmentDto,
    @CurrentUser() user: any,
  ): Promise<WalletAdjustmentResponse> {
    const adjustmentDto: CreateWalletAdjustmentDto = {
      ...dto,
      adjustment_type: 'DEDUCT' as any,
      reason: 'WITHDRAW' as any,
    };
    return WalletAdjustmentMapper.toResponse(
      await this.createWithdrawAdjustmentUseCase.execute(adjustmentDto, user.id),
    );
  }

  /**
   * Create a found money adjustment (Adds found money to wallet)
   */
  @Post('found')
  async createFound(
    @Body() dto: CreateFoundAdjustmentDto,
    @CurrentUser() user: any,
  ): Promise<WalletAdjustmentResponse> {
    const adjustmentDto: CreateWalletAdjustmentDto = {
      ...dto,
      adjustment_type: 'ADD' as any,
      reason: 'FOUND' as any,
    };
    return WalletAdjustmentMapper.toResponse(
      await this.createFoundAdjustmentUseCase.execute(adjustmentDto, user.id),
    );
  }

  /**
   * Create a lost money adjustment (Removes lost money from wallet)
   */
  @Post('lost')
  async createLost(
    @Body() dto: CreateLostAdjustmentDto,
    @CurrentUser() user: any,
  ): Promise<WalletAdjustmentResponse> {
    const adjustmentDto: CreateWalletAdjustmentDto = {
      ...dto,
      adjustment_type: 'DEDUCT' as any,
      reason: 'LOST' as any,
    };
    return WalletAdjustmentMapper.toResponse(
      await this.createLostAdjustmentUseCase.execute(adjustmentDto, user.id),
    );
  }

  /**
   * Create a transfer between two branches (Atomic transaction)
   */
  @Post('transfer')
  async createTransfer(
    @Body() dto: CreateWalletTransferDto,
    @CurrentUser() user: any,
  ): Promise<WalletAdjustmentResponse> {
    return WalletAdjustmentMapper.toResponse(
      await this.createTransferAdjustmentUseCase.execute(dto, user.id),
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
