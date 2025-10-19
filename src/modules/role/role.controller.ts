import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { GetRoleUseCase } from './application/queries/get-Role.usecase';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { RoleResponse } from './interface/role.interface';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
import { RoleMapper } from './infrastructure/role.mapper';
import { CreateRoleDto } from './dto/create-Role.dto';
import { CreateRoleUseCase } from './application/commands/create-Role.usecase';
import { GetOneRoleUseCase } from './application/queries/getOne-Role.usecase';
import { SoftDeleteRoleUseCase } from './application/commands/soft-Role.usecase';
import { UpdateRoleUseCase } from './application/commands/udate-Role.usecase';
import { HardDeleteRoleUseCase } from './application/commands/hard-Role.usecase';
import { RestoreRoleUseCase } from './application/commands/restore-Role.usecase';

@Controller('role')
export class RoleController {
  constructor(
    private readonly getRoleUseCase: GetRoleUseCase,
    private readonly createRoleUseCase: CreateRoleUseCase,
    private readonly getOneRoleUseCase: GetOneRoleUseCase,
    private readonly updateRoleUseCase: UpdateRoleUseCase,
    private readonly softDeleteRoleUseCase: SoftDeleteRoleUseCase,
    private readonly hardDeleteRoleUseCase: HardDeleteRoleUseCase,
    private readonly restoreRoleUseCase: RestoreRoleUseCase,
  ) {}
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() dto: CreateRoleDto,
  ): Promise<RoleResponse> {
    return RoleMapper.toResponse(await this.updateRoleUseCase.execute(id, dto));
  }
  @Get()
  async findAll(
    @Query() query: PaginationDto,
  ): Promise<PaginatedResponse<RoleResponse>> {
    return RoleMapper.toResponseList(await this.getRoleUseCase.execute(query));
  }
  @Get(':id')
  async findOne(@Param() id: number): Promise<RoleResponse> {
    return RoleMapper.toResponse(await this.getOneRoleUseCase.execute(id));
  }
  @Post()
  async create(@Body() dto: CreateRoleDto): Promise<RoleResponse> {
    return RoleMapper.toResponse(await this.createRoleUseCase.execute(dto));
  }

  @Delete('soft/:id')
  async softDelete(@Param('id') id: number): Promise<{ message: string }> {
    return await this.softDeleteRoleUseCase.execute(+id);
  }

  @Delete('hard/:id')
  async hardDelete(@Param('id') id: number): Promise<{ message: string }> {
    return await this.hardDeleteRoleUseCase.execute(+id);
  }

  @Patch('restore/:id')
  async restore(@Param('id') id: number): Promise<{ message: string }> {
    return await this.restoreRoleUseCase.execute(+id);
  }
}
