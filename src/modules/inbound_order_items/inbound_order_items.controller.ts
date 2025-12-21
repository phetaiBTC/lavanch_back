
  
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
import { Inbound_order_items } from './domain/inbound_order_items.entity';
import { Inbound_order_itemsOrm } from 'src/database/typeorm/inbound_order_items.orm-entity';
import { Inbound_order_itemsResponse } from './interface/inbound_order_items.interface';
import { CreateInbound_order_itemsDto } from './dto/create-inbound_order_items.dto';
import { UpdateInbound_order_itemsDto } from './dto/update-inbound_order_items.dto';
import { CreateInbound_order_itemsUseCase } from './application/commands/create-inbound_order_items.usecase';
import { UpdateInbound_order_itemsUseCase } from './application/commands/update-inbound_order_items.usecase';
import { FindOneInbound_order_itemsUseCase } from './application/queries/findOne-inbound_order_items.usecase';
import { FindInbound_order_itemsUseCase } from './application/queries/findAll-inbound_order_items.usecase';
import { Inbound_order_itemsMapper } from './infrastructure/inbound_order_items.mapper';
import { RestoreInbound_order_itemsUseCase } from './application/commands/restore-inbound_order_items.usecase';
import { SoftDeleteInbound_order_itemsUseCase } from './application/commands/soft-inbound_order_items.usecase';
import { HardDeleteInbound_order_itemsUseCase } from './application/commands/hard-inbound_order_items.usecase';
import { BaseController } from 'src/shared/BaseModule/base.controller';

@Controller('inbound_order_items')
export class Inbound_order_itemsController extends BaseController<
  Inbound_order_items,
  Inbound_order_itemsOrm,
  Inbound_order_itemsResponse,
  CreateInbound_order_itemsDto,
  UpdateInbound_order_itemsDto
> {
  constructor(
    private readonly createInbound_order_itemsUseCase: CreateInbound_order_itemsUseCase,
    private readonly updateInbound_order_itemsUseCase: UpdateInbound_order_itemsUseCase,
    protected readonly findOneInbound_order_itemsUseCase: FindOneInbound_order_itemsUseCase,
    private readonly findInbound_order_itemsUseCase: FindInbound_order_itemsUseCase,
    protected readonly hardDeleteInbound_order_itemsUseCase: HardDeleteInbound_order_itemsUseCase,
    protected readonly softDeleteInbound_order_itemsUseCase: SoftDeleteInbound_order_itemsUseCase,
    protected readonly restoreInbound_order_itemsUseCase: RestoreInbound_order_itemsUseCase,
  ) {
    super({
      mapper: Inbound_order_itemsMapper,
      findOne: findOneInbound_order_itemsUseCase,
      hardDelete: hardDeleteInbound_order_itemsUseCase,
      softDelete: softDeleteInbound_order_itemsUseCase,
      restore: restoreInbound_order_itemsUseCase,
    });
  }

  @Post('')
  async create(@Body() body: CreateInbound_order_itemsDto): Promise<Inbound_order_itemsResponse> {
    return Inbound_order_itemsMapper.toResponse(await this.createInbound_order_itemsUseCase.execute(body));
  }

  @Get('')
  async findAll(
    @Query()
    query: PaginationDto,
  ): Promise<PaginatedResponse<Inbound_order_itemsResponse>> {
    return Inbound_order_itemsMapper.toResponseList(await this.findInbound_order_itemsUseCase.execute(query));
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateInbound_order_itemsDto,
  ): Promise<Inbound_order_itemsResponse> {
    return Inbound_order_itemsMapper.toResponse(await this.updateInbound_order_itemsUseCase.execute(id, dto));
  }
}
  
  
  