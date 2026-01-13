import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { CreateInboundOrderUseCase } from './application/commands/create-inbound-order.usecase';
import { ReceiveInboundOrderUseCase } from './application/commands/receive-inbound-order.usecase';
import { CreateInboundOrderDto } from './dto/create-inbound-order.dto';
import { CurrentUser } from 'src/shared/decorator/user.decorator';
import { type AuthPayload } from 'src/modules/auth/interface/auth.interface';
import { ReceiveInboundOrderItemDto } from './dto/receive-inbound-order.dto';

@Controller('inbound-orders')
export class InboundOrdersController {
  constructor(
    private readonly createInboundOrderUseCase: CreateInboundOrderUseCase,
    private readonly receiveInboundOrderUseCase: ReceiveInboundOrderUseCase,
  ) {}

  @Post()
  async create(
    @Body() body: CreateInboundOrderDto,
    @CurrentUser() user: AuthPayload,
  ) {
    return this.createInboundOrderUseCase.execute(body, user);
  }

  @Patch('receive/:id/:itemId')
  async receive(
    @CurrentUser() user: AuthPayload,
    @Body() body: ReceiveInboundOrderItemDto,
    @Param('id') id: number,
    @Param('itemId') itemId: number,
  ) {
    return this.receiveInboundOrderUseCase.execute(id, itemId, body, user);
  }
}
