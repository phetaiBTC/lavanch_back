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
import { CreateMemberTierDto } from './dto/create-member-tier.dto';
import { UpdateMemberTierDto } from './dto/update-member-tier.dto';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { CreateMemberTierUseCase } from './application/commands/create-member-tier.usecase';
import { UpdateMemberTierUseCase } from './application/commands/update-member-tier.usecase';
import { HardDeleteMemberTierUseCase } from './application/commands/hard-delete-member-tier.usecase';
import { SoftDeleteMemberTierUseCase } from './application/commands/soft-delete-member-tier.usecase';
import { RestoreMemberTierUseCase } from './application/commands/restore-member-tier.usecase';
import { FindOneMemberTierUseCase } from './application/queries/findOne-member-tier.usecase';
import { FindAllMemberTierUseCase } from './application/queries/find-member-tier.usecase';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
import { MemberTierMapper } from './infrastructure/member-tier.mapper';
import { MemberTierResponse } from './interface/member-tier.interface';

@Controller('member-tiers')
export class MemberTierController {
  constructor(
    private readonly createMemberTierUseCase: CreateMemberTierUseCase,
    private readonly updateMemberTierUseCase: UpdateMemberTierUseCase,
    private readonly hardDeleteMemberTierUseCase: HardDeleteMemberTierUseCase,
    private readonly softDeleteMemberTierUseCase: SoftDeleteMemberTierUseCase,
    private readonly restoreMemberTierUseCase: RestoreMemberTierUseCase,
    private readonly findOneMemberTierUseCase: FindOneMemberTierUseCase,
    private readonly findAllMemberTierUseCase: FindAllMemberTierUseCase,
  ) {}

  @Post()
  async create(@Body() dto: CreateMemberTierDto): Promise<MemberTierResponse> {
    return MemberTierMapper.toResponse(
      await this.createMemberTierUseCase.execute(dto),
    );
  }

  @Get()
  async findAll(
    @Query() query: PaginationDto,
  ): Promise<PaginatedResponse<MemberTierResponse>> {
    return MemberTierMapper.toResponseList(
      await this.findAllMemberTierUseCase.execute(query),
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<MemberTierResponse> {
    return MemberTierMapper.toResponse(
      await this.findOneMemberTierUseCase.execute(id),
    );
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateMemberTierDto,
  ): Promise<MemberTierResponse> {
    return MemberTierMapper.toResponse(
      await this.updateMemberTierUseCase.execute(id, dto),
    );
  }

  @Delete('soft/:id')
  async softDelete(@Param('id') id: number): Promise<{ message: string }> {
    return await this.softDeleteMemberTierUseCase.execute(+id);
  }

  @Delete('hard/:id')
  async hardDelete(@Param('id') id: number): Promise<{ message: string }> {
    return await this.hardDeleteMemberTierUseCase.execute(+id);
  }

  @Patch('restore/:id')
  async restore(@Param('id') id: number): Promise<{ message: string }> {
    return await this.restoreMemberTierUseCase.execute(+id);
  }
}
