import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/AuthGuard';
import { CreateMemberPointDto } from './dto/create-member-point.dto';
import { AddPointDto } from './dto/add-point.dto';
import { SubtractPointDto } from './dto/subtract-point.dto';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { CreateMemberPointUseCase } from './application/commands/create-member-point.usecase';
import { AddPointUseCase } from './application/commands/add-point.usecase';
import { SubtractPointUseCase } from './application/commands/subtract-point.usecase';
import { FindAllMemberPointUseCase } from './application/queries/findAll-member-point.usecase';
import { FindOneMemberPointUseCase } from './application/queries/findOne-member-point.usecase';
import { MemberPointMapper } from './infrastructure/member-point.mapper';

@Controller('member-points')
@UseGuards(JwtAuthGuard)
export class MemberPointController {
  constructor(
    private readonly createUseCase: CreateMemberPointUseCase,
    private readonly addPointUseCase: AddPointUseCase,
    private readonly subtractPointUseCase: SubtractPointUseCase,
    private readonly findAllUseCase: FindAllMemberPointUseCase,
    private readonly findOneUseCase: FindOneMemberPointUseCase,
  ) {}

  @Post()
  async create(@Body() dto: CreateMemberPointDto) {
    const memberPoint = await this.createUseCase.execute(dto);
    return MemberPointMapper.toResponse(memberPoint);
  }

  @Post('add')
  async addPoints(@Body() dto: AddPointDto) {
    const memberPoint = await this.addPointUseCase.execute(dto);
    return MemberPointMapper.toResponse(memberPoint);
  }

  @Post('subtract')
  async subtractPoints(@Body() dto: SubtractPointDto) {
    const memberPoint = await this.subtractPointUseCase.execute(dto);
    return MemberPointMapper.toResponse(memberPoint);
  }

  @Get()
  async findAll(@Query() query: PaginationDto) {
    const result = await this.findAllUseCase.execute(query);
    return {
      ...result,
      data: result.data.map((point) => MemberPointMapper.toResponse(point)),
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const memberPoint = await this.findOneUseCase.execute(Number(id));
    return memberPoint ? MemberPointMapper.toResponse(memberPoint) : null;
  }
}
