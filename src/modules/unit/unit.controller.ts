// import {
//   Controller,
//   Get,
//   Post,
//   Body,
//   Param,
//   Patch,
//   Delete,
//   Query,
// } from '@nestjs/common';
// import { CreateUnitDto } from './dto/create-Unit.dto';
// import { UpdateUnitDto } from './dto/update-Unit.dto';
// import { PaginationDto } from 'src/shared/dto/pagination.dto';
// import { CreateUnitUseCase } from './application/commands/create-Unit.usecase';
// import { UpdateUnitUseCase } from './application/commands/update-Unit.usecase';
// import { HardDeleteUnitUseCase } from './application/commands/hard-Unit.usecase';
// import { SoftDeleteUnitUseCase } from './application/commands/soft-Unit.usecase';
// import { RestoreUnitUseCase } from './application/commands/restore-Unit.usecase';
// import { FindOneUnitUseCase } from './application/queries/findOne-Unit.usecase';
// import { FindAllUnitUseCase } from './application/queries/find-Unit.usecase';
// import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
// import { UnitMapper } from './infrastructure/unit.mapper';
// import { UnitResponse } from './interface/unit.interface';
// import { ActiveDto } from 'src/shared/dto/avtive.dto';
// import { ActiveUnitUseCase } from './application/commands/active-Unit.usecase';
// @Controller('unit')
// export class UnitController {
//   constructor(
//     private readonly createUnitUseCase: CreateUnitUseCase,
//     private readonly updateUnitUseCase: UpdateUnitUseCase,
//     private readonly hardDeleteUnitUseCase: HardDeleteUnitUseCase,
//     private readonly softDeleteUnitUseCase: SoftDeleteUnitUseCase,
//     private readonly restoreUnitUseCase: RestoreUnitUseCase,
//     private readonly findOneUnitUseCase: FindOneUnitUseCase,
//     private readonly findAllUnitUseCase: FindAllUnitUseCase,
//     private readonly updateActiveUnitUseCase: ActiveUnitUseCase,
//   ) {}
//   @Post() async create(@Body() dto: CreateUnitDto): Promise<UnitResponse> {
//     return UnitMapper.toResponse(await this.createUnitUseCase.execute(dto));
//   }
//   @Get() async findAll(
//     @Query() query: PaginationDto,
//   ): Promise<PaginatedResponse<UnitResponse>> {
//     return UnitMapper.toResponseList(
//       await this.findAllUnitUseCase.execute(query),
//     );
//   }
//   @Get(':id') async findOne(@Param('id') id: number): Promise<UnitResponse> {
//     return UnitMapper.toResponse(await this.findOneUnitUseCase.execute(id));
//   }
//   @Patch(':id') async update(
//     @Param('id') id: number,
//     @Body() dto: UpdateUnitDto,
//   ): Promise<UnitResponse> {
//     return UnitMapper.toResponse(await this.updateUnitUseCase.execute(id, dto));
//   }
//   @Patch('active-update/:id') async activeUpdate(
//     @Param('id') id: number,
//     @Body() dto: ActiveDto,
//   ): Promise<UnitResponse> {
//     return UnitMapper.toResponse(
//       await this.updateActiveUnitUseCase.execute(id, dto),
//     );
//   }
//   @Delete('soft/:id') async softDelete(
//     @Param('id') id: number,
//   ): Promise<{ message: string }> {
//     return await this.softDeleteUnitUseCase.execute(+id);
//   }
//   @Delete('hard/:id') async hardDelete(
//     @Param('id') id: number,
//   ): Promise<{ message: string }> {
//     return await this.hardDeleteUnitUseCase.execute(+id);
//   }
//   @Patch('restore/:id') async restore(
//     @Param('id') id: number,
//   ): Promise<{ message: string }> {
//     return await this.restoreUnitUseCase.execute(+id);
//   }
// }


import { Controller, Patch, Param, Body } from '@nestjs/common';
import { Unit } from './domain/unit.entity';
import { UnitOrm } from 'src/database/typeorm/unit.orm-entity';
import { UnitResponse } from './interface/unit.interface';
import { CreateUnitDto } from './dto/create-Unit.dto';
import { UpdateUnitDto } from './dto/update-Unit.dto';
import { ActiveDto } from 'src/shared/dto/avtive.dto';
import { UnitMapper } from './infrastructure/unit.mapper';
import { CreateUnitUseCase } from './application/commands/create-Unit.usecase';
import { UpdateUnitUseCase } from './application/commands/update-Unit.usecase';
import { FindOneUnitUseCase } from './application/queries/findOne-Unit.usecase';
import { FindAllUnitUseCase } from './application/queries/find-Unit.usecase';
import { HardDeleteUnitUseCase } from './application/commands/hard-Unit.usecase';
import { SoftDeleteUnitUseCase } from './application/commands/soft-Unit.usecase';
import { RestoreUnitUseCase } from './application/commands/restore-Unit.usecase';
import { ActiveUnitUseCase } from './application/commands/active-Unit.usecase';
import { BaseController } from 'src/shared/Controller/BaseController';

@Controller('unit')
export class UnitController extends BaseController<
  Unit,
  UnitOrm,
  UnitResponse,
  CreateUnitDto,
  UpdateUnitDto
> {
  constructor(
    createUnitUseCase: CreateUnitUseCase,
    updateUnitUseCase: UpdateUnitUseCase,
    findOneUnitUseCase: FindOneUnitUseCase,
    findAllUnitUseCase: FindAllUnitUseCase,
    hardDeleteUnitUseCase: HardDeleteUnitUseCase,
    softDeleteUnitUseCase: SoftDeleteUnitUseCase,
    restoreUnitUseCase: RestoreUnitUseCase,
    private readonly updateActiveUnitUseCase: ActiveUnitUseCase, // custom
  ) {
    super(
      UnitMapper,
      createUnitUseCase,
      updateUnitUseCase,
      findOneUnitUseCase,
      findAllUnitUseCase,
      hardDeleteUnitUseCase,
      softDeleteUnitUseCase,
      restoreUnitUseCase,
    );
  }

  // custom endpoint only for Unit
  @Patch('active-update/:id')
  async activeUpdate(
    @Param('id') id: number,
    @Body() dto: ActiveDto,
  ): Promise<UnitResponse> {
    return UnitMapper.toResponse(
      await this.updateActiveUnitUseCase.execute(id, dto),
    );
  }
}
