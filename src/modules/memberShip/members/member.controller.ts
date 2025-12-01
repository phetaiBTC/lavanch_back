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
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { CreateMemberUseCase } from './application/commands/create-member.usecase';
import { UpdateMemberUseCase } from './application/commands/update-member.usecase';
import { HardDeleteMemberUseCase } from './application/commands/hard-delete-member.usecase';
import { SoftDeleteMemberUseCase } from './application/commands/soft-delete-member.usecase';
import { RestoreMemberUseCase } from './application/commands/restore-member.usecase';
import { FindOneMemberUseCase } from './application/queries/findOne-member.usecase';
import { FindAllMemberUseCase } from './application/queries/find-member.usecase';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
import { MemberMapper } from './infrastructure/member.mapper';
import { MemberResponse } from './interface/member.interface';

@Controller('members')
export class MemberController {
  constructor(
    private readonly createMemberUseCase: CreateMemberUseCase,
    private readonly updateMemberUseCase: UpdateMemberUseCase,
    private readonly hardDeleteMemberUseCase: HardDeleteMemberUseCase,
    private readonly softDeleteMemberUseCase: SoftDeleteMemberUseCase,
    private readonly restoreMemberUseCase: RestoreMemberUseCase,
    private readonly findOneMemberUseCase: FindOneMemberUseCase,
    private readonly findAllMemberUseCase: FindAllMemberUseCase,
  ) {}

  @Post()
  async create(@Body() dto: CreateMemberDto): Promise<MemberResponse> {
    return MemberMapper.toResponse(await this.createMemberUseCase.execute(dto));
  }

  @Get()
  async findAll(
    @Query() query: PaginationDto,
  ): Promise<PaginatedResponse<MemberResponse>> {
    return MemberMapper.toResponseList(
      await this.findAllMemberUseCase.execute(query),
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<MemberResponse> {
    return MemberMapper.toResponse(await this.findOneMemberUseCase.execute(id));
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateMemberDto,
  ): Promise<MemberResponse> {
    return MemberMapper.toResponse(
      await this.updateMemberUseCase.execute(id, dto),
    );
  }

  @Delete('soft/:id')
  async softDelete(@Param('id') id: number): Promise<{ message: string }> {
    return await this.softDeleteMemberUseCase.execute(+id);
  }

  @Delete('hard/:id')
  async hardDelete(@Param('id') id: number): Promise<{ message: string }> {
    return await this.hardDeleteMemberUseCase.execute(+id);
  }

  @Patch('restore/:id')
  async restore(@Param('id') id: number): Promise<{ message: string }> {
    return await this.restoreMemberUseCase.execute(+id);
  }
}
