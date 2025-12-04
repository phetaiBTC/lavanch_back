import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuppliersRepositoryImpl } from './infrastructure/suppliers.repository.impl';
import { SuppliersController } from './suppliers.controller';
import { SuppliersOrm } from 'src/database/typeorm/suppliers.orm-entity';
import { UniqueValidatorService } from 'src/shared/utils/pass.notfound.util';
import { FindOneSuppliersUseCase } from './application/queries/findOne-Suppliers.usecase';
import { FindAllSuppliersUseCase } from './application/queries/find-Suppliers.usecase';
import { RestoreSuppliersUseCase } from './application/commands/restore-Suppliers.usecase';
import { SoftDeleteSuppliersUseCase } from './application/commands/soft-Suppliers.usecase';
import { HardDeleteSuppliersUseCase } from './application/commands/hard-Suppliers.usecase';
import { UpdateSuppliersUseCase } from './application/commands/update-Suppliers.usecase';
import { CreateSuppliersUseCase } from './application/commands/create-Suppliers.usecase';
import { SUPPLIERS_REPOSITORY } from './domain/suppliers.repository';
import { AddressModule } from '../address/address.module';
// import { FindNamesuppliersUseCase } from './application/queries/findName-suppliers.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([SuppliersOrm]),AddressModule],
  controllers: [SuppliersController],
  providers: [
    { provide: SUPPLIERS_REPOSITORY, useClass: SuppliersRepositoryImpl },
    CreateSuppliersUseCase,
    UpdateSuppliersUseCase,
    HardDeleteSuppliersUseCase,
    SoftDeleteSuppliersUseCase,
    RestoreSuppliersUseCase,
    FindOneSuppliersUseCase,
    FindAllSuppliersUseCase,
    UniqueValidatorService,
  ],
  exports: [],
})
export class suppliersModule {}
