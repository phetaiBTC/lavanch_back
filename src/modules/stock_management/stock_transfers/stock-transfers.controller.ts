import { Body, Controller, Param, Post } from '@nestjs/common';
import { CreateStockTransferUseCase } from './application/commands/create-stock-transfer.usecase';
import { ApproveStockTransferUseCase } from './application/commands/approve-stock-transfer.usecase';
import { ReceiveStockTransferUseCase } from './application/commands/receive-stock-transfer.usecase';
import { CreateStockTransferDto } from './dto/create-stock-transfer.dto';
import { ReceiveStockTransferDto } from './dto/receive-stock-transfer.dto';
import { CurrentUser } from 'src/shared/decorator/user.decorator';
import { type AuthPayload } from 'src/modules/auth/interface/auth.interface';

@Controller('stock-transfers')
export class StockTransfersController {
  constructor(
    private readonly createUseCase: CreateStockTransferUseCase,
    private readonly approveUseCase: ApproveStockTransferUseCase,
    private readonly receiveUseCase: ReceiveStockTransferUseCase,
  ) {}

  @Post()
  async create(
    @Body() dto: CreateStockTransferDto,
    @CurrentUser() user: AuthPayload,
  ) {
    return this.createUseCase.execute(dto, user);
  }

  @Post('approve/:id')
  async approve(@Param() id: number) {
    return this.approveUseCase.execute(id);
  }

  @Post('receive')
  async receive(@Body() dto: ReceiveStockTransferDto) {
    return this.receiveUseCase.execute(dto);
  }
}
