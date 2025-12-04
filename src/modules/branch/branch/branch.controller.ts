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
import { BranchResponse } from './interface/branch.interface';
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
    const branch = await this.createBranchUseCase.execute(dto);
    // Reload with relations to get village data
    const branchWithRelations = await this.findOneBranchUseCase.execute(
      branch.value.id!,
    );
    return BranchMapper.toResponse(
      branchWithRelations,
      (branchWithRelations as any)._orm,
    );
  }

  @Get()
  async findAll(
    @Query() query: PaginationDto,
  ): Promise<PaginatedResponse<BranchResponse>> {
    const result = await this.findAllBranchUseCase.execute(query);
    const response = BranchMapper.toResponseList(result);
    console.log(
      'Branch findAll first item:',
      JSON.stringify(response.data[0], null, 2),
    );
    return response;
  }

  @Get('summary')
  async getSummary() {
    return await this.getBranchSummaryUseCase.execute();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<BranchResponse> {
    const branch = await this.findOneBranchUseCase.execute(id);
    return BranchMapper.toResponse(branch, (branch as any)._orm);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateBranchDto,
  ): Promise<BranchResponse> {
    const branch = await this.updateBranchUseCase.execute(id, dto);
    // Reload with relations to get village data
    const branchWithRelations = await this.findOneBranchUseCase.execute(id);
    return BranchMapper.toResponse(
      branchWithRelations,
      (branchWithRelations as any)._orm,
    );
  }

  @Patch(':id/status')
  async toggleStatus(@Param('id') id: number) {
    return await this.toggleBranchStatusUseCase.execute(+id);
  }

  @Delete('soft/:id')
  async softDelete(@Param('id') id: number): Promise<{ message: string }> {
    return await this.softDeleteBranchUseCase.execute(+id);
  }

  @Delete('multiple')
  async deleteMultiple(@Body() dto: DeleteMultipleBranchesDto) {
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
