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
import { DeleteMultipleBranchesDto } from './dto/delete-multiple-branches.dto';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { CreateBranchUseCase } from './application/commands/create-branch.usecase';
import { HardDeleteBranchUseCase } from './application/commands/hard-branch.usecase';
import { SoftDeleteBranchUseCase } from './application/commands/soft-branch.usecase';
import { RestoreBranchUseCase } from './application/commands/restore-branch.usecase';
import { FindOneBranchUseCase } from './application/queries/findOne-branch.usecase';
import { FindAllBranchUseCase } from './application/queries/find-branch.usecase';
import { GetBranchSummaryUseCase } from './application/queries/get-branch-summary.usecase';
import { ToggleBranchStatusUseCase } from './application/commands/toggle-branch-status.usecase';
import { DeleteMultipleBranchesUseCase } from './application/commands/delete-multiple-branches.usecase';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
import { BranchMapper } from './infrastructure/branch.mapper';
import { BranchResponse, BranchSummaryResponse } from './interface/branch.interface';
import { UpdateBranchUseCase } from './application/commands/update-branch.usecase';
import { Public } from 'src/shared/decorator/auth.decorator';

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
    private readonly getBranchSummaryUseCase: GetBranchSummaryUseCase,
    private readonly toggleBranchStatusUseCase: ToggleBranchStatusUseCase,
    private readonly deleteMultipleBranchesUseCase: DeleteMultipleBranchesUseCase,
  ) {}
   @Public()
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

  @Get('summary')
  async getSummary(): Promise<BranchSummaryResponse> {
    return await this.getBranchSummaryUseCase.execute();
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

  @Patch(':id/status')
  async toggleStatus(@Param('id') id: number): Promise<BranchResponse> {
    return BranchMapper.toResponse(
      await this.toggleBranchStatusUseCase.execute(+id),
    );
  }

  @Delete('soft/:id')
  async softDelete(@Param('id') id: number): Promise<{ message: string }> {
    return await this.softDeleteBranchUseCase.execute(+id);
  }

  @Delete('multiple')
  async deleteMultiple(@Body() dto: DeleteMultipleBranchesDto): Promise<{ message: string; deletedCount: number }> {
    return await this.deleteMultipleBranchesUseCase.execute(dto);
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
