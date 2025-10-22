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
// import { CreatePointDto } from './dto/create-Point.dto';
// import { UpdatePointDto } from './dto/update-Point.dto';
// import { PaginationDto } from 'src/shared/dto/pagination.dto';
// import { CreatePointUseCase } from './application/commands/create-Point.usecase';
// import { UpdatePointUseCase } from './application/commands/update-Point.usecase';
// import { HardDeletePointUseCase } from './application/commands/hard-Point.usecase';
// import { SoftDeletePointUseCase } from './application/commands/soft-Point.usecase';
// import { RestorePointUseCase } from './application/commands/restore-Point.usecase';
// import { FindOnePointUseCase } from './application/queries/findOne-Point.usecase';
// import { FindAllPointUseCase } from './application/queries/find-Point.usecase';
// import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
// import { PointMapper } from './infrastructure/point.mapper';
// import { PointResponse } from './interface/point.interface';
// @Controller('point')
// export class PointController {
//   constructor(
//     private readonly createPointUseCase: CreatePointUseCase,
//     private readonly updatePointUseCase: UpdatePointUseCase,
//     private readonly hardDeletePointUseCase: HardDeletePointUseCase,
//     private readonly softDeletePointUseCase: SoftDeletePointUseCase,
//     private readonly restorePointUseCase: RestorePointUseCase,
//     private readonly findOnePointUseCase: FindOnePointUseCase,
//     private readonly findAllPointUseCase: FindAllPointUseCase,
//   ) {}
//   @Post() async create(@Body() dto: CreatePointDto): Promise<PointResponse> {
//     return PointMapper.toResponse(await this.createPointUseCase.execute(dto));
//   }
//   @Get() async findAll(
//     @Query() query: PaginationDto,
//   ): Promise<PaginatedResponse<PointResponse>> {
//     return PointMapper.toResponseList(
//       await this.findAllPointUseCase.execute(query),
//     );
//   }
//   @Get(':id') async findOne(@Param('id') id: number): Promise<PointResponse> {
//     return PointMapper.toResponse(await this.findOnePointUseCase.execute(id));
//   }
//   @Patch(':id') async update(
//     @Param('id') id: number,
//     @Body() dto: UpdatePointDto,
//   ): Promise<PointResponse> {
//     return PointMapper.toResponse(
//       await this.updatePointUseCase.execute(id, dto),
//     );
//   }
//   @Delete('soft/:id') async softDelete(
//     @Param('id') id: number,
//   ): Promise<{ message: string }> {
//     return await this.softDeletePointUseCase.execute(+id);
//   }
//   @Delete('hard/:id') async hardDelete(
//     @Param('id') id: number,
//   ): Promise<{ message: string }> {
//     return await this.hardDeletePointUseCase.execute(+id);
//   }
//   @Patch('restore/:id') async restore(
//     @Param('id') id: number,
//   ): Promise<{ message: string }> {
//     return await this.restorePointUseCase.execute(+id);
//   }
// }

import { Controller } from '@nestjs/common';
import { Point } from './domain/point.entity';
import { PointOrm } from 'src/database/typeorm/point.orm-entity';
import { PointResponse } from './interface/point.interface';
import { CreatePointDto } from './dto/create-Point.dto';
import { UpdatePointDto } from './dto/update-Point.dto';
import { PointMapper } from './infrastructure/point.mapper';
import { CreatePointUseCase } from './application/commands/create-Point.usecase';
import { UpdatePointUseCase } from './application/commands/update-Point.usecase';
import { FindOnePointUseCase } from './application/queries/findOne-Point.usecase';
import { FindAllPointUseCase } from './application/queries/find-Point.usecase';
import { HardDeletePointUseCase } from './application/commands/hard-Point.usecase';
import { SoftDeletePointUseCase } from './application/commands/soft-Point.usecase';
import { RestorePointUseCase } from './application/commands/restore-Point.usecase';
import { BaseController } from 'src/shared/BaseModule/BaseController';

@Controller('point')
export class PointController extends BaseController<
  Point,
  PointOrm,
  PointResponse,
  CreatePointDto,
  UpdatePointDto
> {
  constructor(
    createPointUseCase: CreatePointUseCase,
    updatePointUseCase: UpdatePointUseCase,
    findOnePointUseCase: FindOnePointUseCase,
    findAllPointUseCase: FindAllPointUseCase,
    hardDeletePointUseCase: HardDeletePointUseCase,
    softDeletePointUseCase: SoftDeletePointUseCase,
    restorePointUseCase: RestorePointUseCase,
  ) {
    super(
      PointMapper,
      createPointUseCase,
      updatePointUseCase,
      findOnePointUseCase,
      findAllPointUseCase,
      hardDeletePointUseCase,
      softDeletePointUseCase,
      restorePointUseCase,
    );
  }

  //  custom endpoints only for Point
  
}
