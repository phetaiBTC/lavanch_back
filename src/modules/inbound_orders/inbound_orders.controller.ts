
  
import {
  Body,
  Controller,
  Param,
  Patch,
  Query,
  Post,
  Get,
} from '@nestjs/common';

import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
import { Inbound_orders } from './domain/inbound_orders.entity';
import { Inbound_ordersOrm } from 'src/database/typeorm/inbound_orders.orm-entity';
import { Inbound_ordersResponse } from './interface/inbound_orders.interface';
import { CreateInbound_ordersDto } from './dto/create-inbound_orders.dto';
import { UpdateInbound_ordersDto } from './dto/update-inbound_orders.dto';
import { CreateInbound_ordersUseCase } from './application/commands/create-inbound_orders.usecase';
import { UpdateInbound_ordersUseCase } from './application/commands/update-inbound_orders.usecase';
import { FindOneInbound_ordersUseCase } from './application/queries/findOne-inbound_orders.usecase';
import { FindInbound_ordersUseCase } from './application/queries/findAll-inbound_orders.usecase';
import { Inbound_ordersMapper } from './infrastructure/inbound_orders.mapper';
import { RestoreInbound_ordersUseCase } from './application/commands/restore-inbound_orders.usecase';
import { SoftDeleteInbound_ordersUseCase } from './application/commands/soft-inbound_orders.usecase';
import { HardDeleteInbound_ordersUseCase } from './application/commands/hard-inbound_orders.usecase';
import { BaseController } from 'src/shared/BaseModule/base.controller';

@Controller('inbound_orders')
export class Inbound_ordersController extends BaseController<
  Inbound_orders,
  Inbound_ordersOrm,
  Inbound_ordersResponse,
  CreateInbound_ordersDto,
  UpdateInbound_ordersDto
> {
  constructor(
    private readonly createInbound_ordersUseCase: CreateInbound_ordersUseCase,
    private readonly updateInbound_ordersUseCase: UpdateInbound_ordersUseCase,
    protected readonly findOneInbound_ordersUseCase: FindOneInbound_ordersUseCase,
    private readonly findInbound_ordersUseCase: FindInbound_ordersUseCase,
    protected readonly hardDeleteInbound_ordersUseCase: HardDeleteInbound_ordersUseCase,
    protected readonly softDeleteInbound_ordersUseCase: SoftDeleteInbound_ordersUseCase,
    protected readonly restoreInbound_ordersUseCase: RestoreInbound_ordersUseCase,
  ) {
    super({
      mapper: Inbound_ordersMapper,
      findOne: findOneInbound_ordersUseCase,
      hardDelete: hardDeleteInbound_ordersUseCase,
      softDelete: softDeleteInbound_ordersUseCase,
      restore: restoreInbound_ordersUseCase,
    });
  }

  @Post('')
  async create(@Body() body: CreateInbound_ordersDto): Promise<Inbound_ordersResponse> {
    return Inbound_ordersMapper.toResponse(await this.createInbound_ordersUseCase.execute(body));
  }

  @Get('')
  async findAll(
    @Query()
    query: PaginationDto,
  ): Promise<PaginatedResponse<Inbound_ordersResponse>> {
    return Inbound_ordersMapper.toResponseList(await this.findInbound_ordersUseCase.execute(query));
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateInbound_ordersDto,
  ): Promise<Inbound_ordersResponse> {
    return Inbound_ordersMapper.toResponse(await this.updateInbound_ordersUseCase.execute(id, dto));
  }
}
  
  
  