import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PointRepositoryImpl } from './infrastructure/point.repository.impl';
import { PointController } from './point.controller';
import { POINT_REPOSITORY } from './domain/point.repository';
import { CreatePointUseCase } from './application/commands/create-Point.usecase';
import { UpdatePointUseCase } from './application/commands/update-Point.usecase';
import { HardDeletePointUseCase } from './application/commands/hard-Point.usecase';
import { SoftDeletePointUseCase } from './application/commands/soft-Point.usecase';
import { RestorePointUseCase } from './application/commands/restore-Point.usecase';
import { FindOnePointUseCase } from './application/queries/findOne-Point.usecase';
import { FindAllPointUseCase } from './application/queries/find-Point.usecase';
import { PointOrm } from 'src/database/typeorm/point.orm-entity';
import { FindNameCodePointUseCase } from './application/queries/findNameCode-Point.usecase';
@Module({
  imports: [TypeOrmModule.forFeature([PointOrm])],
  controllers: [PointController],
  providers: [
    { provide: POINT_REPOSITORY, useClass: PointRepositoryImpl },
    CreatePointUseCase,
    UpdatePointUseCase,
    HardDeletePointUseCase,
    SoftDeletePointUseCase,
    RestorePointUseCase,
    FindOnePointUseCase,
    FindAllPointUseCase,
    FindNameCodePointUseCase,
  ],
  exports: [
    { provide: POINT_REPOSITORY, useClass: PointRepositoryImpl },
    CreatePointUseCase,
    UpdatePointUseCase,
    HardDeletePointUseCase,
    SoftDeletePointUseCase,
    RestorePointUseCase,
    FindOnePointUseCase,
    FindAllPointUseCase,
    FindNameCodePointUseCase,
  ],
})
export class PointModule {}
