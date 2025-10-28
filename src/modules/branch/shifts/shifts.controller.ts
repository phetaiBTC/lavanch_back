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
import { CreateShiftsDto } from './dto/create-shifts.dto';
import { UpdateShiftsDto } from './dto/update-shifts.dto';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { CreateShiftsUseCase } from './application/commands/create-shifts.usecase';
import { HardDeleteShiftsUseCase } from './application/commands/hard-shifts.usecase';
import { SoftDeleteShiftsUseCase } from './application/commands/soft-shifts.usecase';
import { RestoreShiftsUseCase } from './application/commands/restore-shifts.usecase';
import { FindOneShiftsUseCase } from './application/queries/findOne-shifts.usecase';
import { FindAllShiftsUseCase } from './application/queries/find-shifts.usecase';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
import { ShiftsMapper } from './infrastructure/shifts.mapper';
import { ShiftsResponse } from './interface/shifts.interface';
import { UpdateShiftsUseCase } from './application/commands/update-shifts.usecase';
import { Public } from 'src/shared/decorator/auth.decorator';

@Controller('shifts')
export class ShiftsController {
  constructor(
    private readonly createShiftsUseCase: CreateShiftsUseCase,
    private readonly updateShiftsUseCase: UpdateShiftsUseCase,
    private readonly hardDeleteShiftsUseCase: HardDeleteShiftsUseCase,
    private readonly softDeleteShiftsUseCase: SoftDeleteShiftsUseCase,
    private readonly restoreShiftsUseCase: RestoreShiftsUseCase,
    private readonly findOneShiftsUseCase: FindOneShiftsUseCase,
    private readonly findAllShiftsUseCase: FindAllShiftsUseCase,
  ) {}

  @Post()
  async create(@Body() dto: CreateShiftsDto): Promise<ShiftsResponse> {
    return ShiftsMapper.toResponse(await this.createShiftsUseCase.execute(dto));
  }

  @Get()
  async findAll(
    @Query() query: PaginationDto,
  ): Promise<PaginatedResponse<ShiftsResponse>> {
    return ShiftsMapper.toResponseList(
      await this.findAllShiftsUseCase.execute(query),
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ShiftsResponse> {
    return ShiftsMapper.toResponse(
      await this.findOneShiftsUseCase.execute(id),
    );
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateShiftsDto,
  ): Promise<ShiftsResponse> {
    return ShiftsMapper.toResponse(
      await this.updateShiftsUseCase.execute(id, dto),
    );
  }

  @Delete('soft/:id')
  async softDelete(@Param('id') id: number): Promise<{ message: string }> {
    return await this.softDeleteShiftsUseCase.execute(+id);
  }

  @Delete('hard/:id')
  async hardDelete(@Param('id') id: number): Promise<{ message: string }> {
    return await this.hardDeleteShiftsUseCase.execute(+id);
  }

  @Patch('restore/:id')
  async restore(@Param('id') id: number): Promise<{ message: string }> {
    return await this.restoreShiftsUseCase.execute(+id);
  }
}
