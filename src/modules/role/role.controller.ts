import { Body, Controller, Param, Patch, Query, Post, Get, Delete } from '@nestjs/common';
import { Role } from './domain/role.entity';
import { RoleOrm } from 'src/database/typeorm/role.orm-entity';
import { RoleResponse } from './interface/role.interface';
import { CreateRoleDto } from './dto/create-Role.dto';
import { RoleMapper } from './infrastructure/role.mapper';
import { CreateRoleUseCase } from './application/commands/create-Role.usecase';
import { UpdateRoleUseCase } from './application/commands/udate-Role.usecase';
import { GetOneRoleUseCase } from './application/queries/getOne-Role.usecase';
import { GetRoleUseCase } from './application/queries/get-Role.usecase';
import { HardDeleteRoleUseCase } from './application/commands/hard-Role.usecase';
import { SoftDeleteRoleUseCase } from './application/commands/soft-Role.usecase';
import { RestoreRoleUseCase } from './application/commands/restore-Role.usecase';
import { BaseController } from 'src/shared/BaseModule/BaseController';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';

@Controller('role')
export class RoleController extends BaseController<
  Role,
  RoleOrm,
  RoleResponse,
  CreateRoleDto,
  CreateRoleDto
> {
  constructor(
    createRoleUseCase: CreateRoleUseCase,
    updateRoleUseCase: UpdateRoleUseCase,
    getOneRoleUseCase: GetOneRoleUseCase,
    getRoleUseCase: GetRoleUseCase,
    hardDeleteRoleUseCase: HardDeleteRoleUseCase,
    softDeleteRoleUseCase: SoftDeleteRoleUseCase,
    restoreRoleUseCase: RestoreRoleUseCase,
  ) {
    super(
      RoleMapper,
      createRoleUseCase,
      updateRoleUseCase,
      getOneRoleUseCase,
      getRoleUseCase,
      hardDeleteRoleUseCase,
      softDeleteRoleUseCase,
      restoreRoleUseCase,
    );
  }

}
