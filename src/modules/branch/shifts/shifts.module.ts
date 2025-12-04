import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShiftsRepositoryImpl } from './infrastructure/shifts.repository.impl';
import { ShiftsController } from './shifts.controller';
import { SHIFTS_REPOSITORY } from './domain/shifts.repository';
import { ShiftsOrm } from 'src/database/typeorm/shifts.orm-entity';
import { CreateShiftsUseCase } from './application/commands/create-shifts.usecase';
import { HardDeleteShiftsUseCase } from './application/commands/hard-shifts.usecase';
import { SoftDeleteShiftsUseCase } from './application/commands/soft-shifts.usecase';
import { RestoreShiftsUseCase } from './application/commands/restore-shifts.usecase';
import { FindOneShiftsUseCase } from './application/queries/findOne-shifts.usecase';
import { FindAllShiftsUseCase } from './application/queries/find-shifts.usecase';
import { UpdateShiftsUseCase } from './application/commands/update-shifts.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([ShiftsOrm])],
  controllers: [ShiftsController],
  providers: [
    { provide: SHIFTS_REPOSITORY, useClass: ShiftsRepositoryImpl },
    CreateShiftsUseCase,
    UpdateShiftsUseCase,
    HardDeleteShiftsUseCase,
    SoftDeleteShiftsUseCase,
    RestoreShiftsUseCase,
    FindOneShiftsUseCase,
    FindAllShiftsUseCase,
  ],
  exports: [FindOneShiftsUseCase],
})
export class ShiftsModule {}
