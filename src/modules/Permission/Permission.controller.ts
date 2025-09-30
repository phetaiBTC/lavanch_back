import { Controller, Get, Query } from '@nestjs/common';
import { GetPermissionUseCase } from './application/queries/get-Permission.usecase';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
import { PermissionResponse } from './interface/Permission.interface';
import { PermissionMapper } from './infrastructure/Permission.mapper';

@Controller('Permission'.toLowerCase())
export class PermissionController {
  constructor(private readonly getPermissionUseCase: GetPermissionUseCase) {}
  @Get()
  async findAll(
    @Query() query: PaginationDto,
  ): Promise<PaginatedResponse<PermissionResponse>> {
    return PermissionMapper.toResponseList(
      await this.getPermissionUseCase.execute(query),
    );
  }
}
