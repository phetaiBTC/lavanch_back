import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductUnitRepositoryImpl } from './infrastructure/product_unit.repository.impl';
import { ProductUnitController } from './product_unit.controller';
import { PRODUCT_UNIT_REPOSITORY } from './domain/product_unit.repository';
import { CreateProductUnitUseCase } from './application/commands/create-ProductUnit.usecase';
import { UpdateProductUnitUseCase } from './application/commands/update-ProductUnit.usecase';
import { HardDeleteProductUnitUseCase } from './application/commands/hard-ProductUnit.usecase';
import { SoftDeleteProductUnitUseCase } from './application/commands/soft-ProductUnit.usecase';
import { RestoreProductUnitUseCase } from './application/commands/restore-ProductUnit.usecase';
import { FindOneProductUnitUseCase } from './application/queries/findOne-ProductUnit.usecase';
import { FindAllProductUnitUseCase } from './application/queries/find-ProductUnit.usecase';
import { ProductUnitOrm } from 'src/database/typeorm/product-unit.orm-entity';
import { ProductVariantModule } from '../product_variant/product_variant.module';
import { UnitModule } from '../unit/unit.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([ProductUnitOrm]),
    ProductVariantModule,
    UnitModule,
  ],
  controllers: [ProductUnitController],
  providers: [
    { provide: PRODUCT_UNIT_REPOSITORY, useClass: ProductUnitRepositoryImpl },
    CreateProductUnitUseCase,
    UpdateProductUnitUseCase,
    HardDeleteProductUnitUseCase,
    SoftDeleteProductUnitUseCase,
    RestoreProductUnitUseCase,
    FindOneProductUnitUseCase,
    FindAllProductUnitUseCase,
  ],
  exports: [
    { provide: PRODUCT_UNIT_REPOSITORY, useClass: ProductUnitRepositoryImpl },
    CreateProductUnitUseCase,
    UpdateProductUnitUseCase,
    HardDeleteProductUnitUseCase,
    SoftDeleteProductUnitUseCase,
    RestoreProductUnitUseCase,
    FindOneProductUnitUseCase,
    FindAllProductUnitUseCase,
  ],
})
export class ProductUnitModule {}
