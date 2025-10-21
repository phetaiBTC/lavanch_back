import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { CreateBranchUseCase } from './application/commands/create-branch.usecase';
import { HardDeleteBranchUseCase } from './application/commands/hard-branch.usecase';
import { SoftDeleteBranchUseCase } from './application/commands/soft-branch.usecase';
import { RestoreBranchUseCase } from './application/commands/restore-branch.usecase';
import { FindOneBranchUseCase } from './application/queries/findOne-branch.usecase';
import { FindAllBranchUseCase } from './application/queries/find-branch.usecase';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
import { BranchMapper } from './infrastructure/branch.mapper';
import { BranchResponse } from './interface/branch.interface';
import { UpdateBranchUseCase } from './application/commands/update-branch.usecase';

@Controller('branches')
export class BranchController {
  constructor(
    private readonly createBranchUseCase: CreateBranchUseCase,
    private readonly updateBranchUseCase: UpdateBranchUseCase,
    private readonly hardDeleteBranchUseCase: HardDeleteBranchUseCase,
    private readonly softDeleteBranchUseCase: SoftDeleteBranchUseCase,
    private readonly restoreBranchUseCase: RestoreBranchUseCase,
    private readonly findOneBranchUseCase: FindOneBranchUseCase,
    private readonly findAllBranchUseCase: FindAllBranchUseCase,
  ) {}

  @Post()
  async create(@Body() dto: CreateBranchDto): Promise<BranchResponse> {
    return BranchMapper.toResponse(await this.createBranchUseCase.execute(dto));
  }

  @Get()
  async findAll(
    @Query() query: PaginationDto,
  ): Promise<PaginatedResponse<BranchResponse>> {
    return BranchMapper.toResponseList(
      await this.findAllBranchUseCase.execute(query),
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<BranchResponse> {
    return BranchMapper.toResponse(
      await this.findOneBranchUseCase.execute(id),
    );
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateBranchDto,
  ): Promise<BranchResponse> {
    return BranchMapper.toResponse(
      await this.updateBranchUseCase.execute(id, dto),
    );
  }

  @Delete('soft/:id')
  async softDelete(@Param('id') id: number): Promise<{ message: string }> {
    return await this.softDeleteBranchUseCase.execute(+id);
  }

  @Delete('hard/:id')
  async hardDelete(@Param('id') id: number): Promise<{ message: string }> {
    return await this.hardDeleteBranchUseCase.execute(+id);
  }

  @Patch('restore/:id')
  async restore(@Param('id') id: number): Promise<{ message: string }> {
    return await this.restoreBranchUseCase.execute(+id);
  }
}
