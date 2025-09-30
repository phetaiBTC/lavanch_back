import { Controller, Get, Query } from '@nestjs/common';
import { GetRoleUseCase } from './application/queries/get-Role.usecase';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { RoleResponse } from './interface/Role.interface';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
import { RoleMapper } from './infrastructure/Role.mapper';

@Controller('Role'.toLowerCase())
export class RoleController {
  constructor(private readonly getRoleUseCase: GetRoleUseCase) {}

  @Get()
  async findAll(
    @Query() query: PaginationDto,
  ): Promise<PaginatedResponse<RoleResponse>> {
    return RoleMapper.toResponseList(await this.getRoleUseCase.execute(query));
  }
}
