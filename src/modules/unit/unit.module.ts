import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnitRepositoryImpl } from './infrastructure/unit.repository.impl';
import { UnitController } from './unit.controller';
import { UNIT_REPOSITORY } from './domain/unit.repository';
import { CreateUnitUseCase } from './application/commands/create-Unit.usecase';
import { UpdateUnitUseCase } from './application/commands/update-Unit.usecase';
import { HardDeleteUnitUseCase } from './application/commands/hard-Unit.usecase';
import { SoftDeleteUnitUseCase } from './application/commands/soft-Unit.usecase';
import { RestoreUnitUseCase } from './application/commands/restore-Unit.usecase';
import { FindOneUnitUseCase } from './application/queries/findOne-Unit.usecase';
import { FindAllUnitUseCase } from './application/queries/find-Unit.usecase';
import { UnitOrm } from 'src/database/typeorm/unit.orm-entity';
import { ActiveUnitUseCase } from './application/commands/active-Unit.usecase';
import { CreateUnitDto } from './dto/create-Unit.dto';
@Module({
  imports: [TypeOrmModule.forFeature([UnitOrm])],
  controllers: [UnitController],
  providers: [
    { provide: UNIT_REPOSITORY, useClass: UnitRepositoryImpl },
    CreateUnitUseCase,
    UpdateUnitUseCase,
    HardDeleteUnitUseCase,
    SoftDeleteUnitUseCase,
    RestoreUnitUseCase,
    FindOneUnitUseCase,
    FindAllUnitUseCase,
    ActiveUnitUseCase,
    // CreateUnitDto
  ],
  exports: [
    { provide: UNIT_REPOSITORY, useClass: UnitRepositoryImpl },
    CreateUnitUseCase,
    UpdateUnitUseCase,
    HardDeleteUnitUseCase,
    SoftDeleteUnitUseCase,
    RestoreUnitUseCase,
    FindOneUnitUseCase,
    FindAllUnitUseCase,
    ActiveUnitUseCase,
  ],
})
export class UnitModule {}
