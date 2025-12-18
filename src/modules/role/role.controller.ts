import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Role } from './domain/role.entity';
import { RoleOrm } from 'src/database/typeorm/role.orm-entity';
import { RoleResponse } from './interface/role.interface';
import { CreateRoleDto } from './dto/create-Role.dto';
import { RoleMapper } from './infrastructure/role.mapper';
import { CreateRoleUseCase } from './application/commands/create-Role.usecase';
import { UpdateRoleUseCase } from './application/commands/update-Role.usecase';
import { GetOneRoleUseCase } from './application/queries/getOne-Role.usecase';
import { GetRoleUseCase } from './application/queries/get-Role.usecase';
import { HardDeleteRoleUseCase } from './application/commands/hard-Role.usecase';
import { SoftDeleteRoleUseCase } from './application/commands/soft-Role.usecase';
import { RestoreRoleUseCase } from './application/commands/restore-Role.usecase';
import { BaseController } from 'src/shared/BaseModule/base.controller';
import { UpdateRoleDto } from './dto/update-Role.dto';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';

@Controller('role')
export class RoleController extends BaseController<
  Role,
  RoleOrm,
  RoleResponse,
  CreateRoleDto,
  UpdateRoleDto
> {
  constructor(
    private readonly createRoleUseCase: CreateRoleUseCase,
    private readonly updateRoleUseCase: UpdateRoleUseCase,
    private readonly getRoleUseCase: GetRoleUseCase,
    protected readonly getOneRoleUseCase: GetOneRoleUseCase,
    protected readonly hardDeleteRoleUseCase: HardDeleteRoleUseCase,
    protected readonly softDeleteRoleUseCase: SoftDeleteRoleUseCase,
    protected readonly restoreRoleUseCase: RestoreRoleUseCase,
  ) {
    super({
      mapper: RoleMapper,
      findOne: getOneRoleUseCase,
      hardDelete: hardDeleteRoleUseCase,
      softDelete: softDeleteRoleUseCase,
      restore: restoreRoleUseCase,
    });
  }
  @Post()
  override async create(@Body() dto: CreateRoleDto): Promise<RoleResponse> {
    return RoleMapper.toResponse(await this.createRoleUseCase.execute(dto));
  }

  @Patch(':id')
  override async update(
    @Param('id') id: number,
    @Body() dto: UpdateRoleDto,
  ): Promise<RoleResponse> {
    return RoleMapper.toResponse(await this.updateRoleUseCase.execute(id, dto));
  }

  @Get()
  override async findAll(
    @Query() query: PaginationDto,
  ): Promise<PaginatedResponse<RoleResponse>> {
    return RoleMapper.toResponseList(await this.getRoleUseCase.execute(query));
  }
}
