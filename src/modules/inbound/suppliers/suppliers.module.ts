import { Module } from '@nestjs/common';
import { SuppliersController } from './suppliers.controller';
import { SUPPLIER_REPOSITORY } from './domain/supplier.repository';
import { SupplierRepositoryImpl } from './infrastructure/supplier.repository.impl';
import { CreateSupplierUseCase } from './applications/commands/create-supplier.usecase';
import { UpdateSupplierUseCase } from './applications/commands/update-supplier.usecase';
import { SoftDeleteSupplierUseCase } from './applications/commands/soft-supplier.usecase';
import { HardDeleteSupplierUseCase } from './applications/commands/hard-supplier.usecase';
import { RestoreSupplierUseCase } from './applications/commands/restore-supplier.usecase';
import { FindOneSupplierUseCase } from './applications/queries/findOne-supplier.usecase';
import { FindAllSupplierUseCase } from './applications/queries/find-supplier.usecase';
import { SupplierMapper } from './infrastructure/supplier.mapper';
import { LoadSupplierUseCase } from './applications/queries/load-supplier.usecase';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuppliersOrm } from 'src/database/typeorm/suppliers.orm-entity';
import { VillageOrm } from 'src/database/typeorm/village.orm-entity';
@Module({
  imports: [TypeOrmModule.forFeature([SuppliersOrm, VillageOrm])],
  controllers: [SuppliersController],
  providers: [
    {
      provide: SUPPLIER_REPOSITORY,
      useClass: SupplierRepositoryImpl,
    },
    CreateSupplierUseCase,
    UpdateSupplierUseCase,
    SoftDeleteSupplierUseCase,
    HardDeleteSupplierUseCase,
    RestoreSupplierUseCase,
    FindOneSupplierUseCase,
    FindAllSupplierUseCase,
    LoadSupplierUseCase,
    SupplierMapper
  ],
  exports: [],
})
export class SuppliersModule {}
