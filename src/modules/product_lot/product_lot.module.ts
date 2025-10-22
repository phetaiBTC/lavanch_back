import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductLotRepositoryImpl } from './infrastructure/product_lot.repository.impl';
import { ProductLotController } from './product_lot.controller';
import { PRODUCT_LOT_REPOSITORY } from './domain/product_lot.repository';
import { ProductLotOrm } from 'src/database/typeorm/product_lot.orm-entity';
import { CreateProductLotUseCase } from './application/commands/create-ProductLot.usecase';
import { UpdateProductLotUseCase } from './application/commands/update-ProductLot.usecase';
import { HardDeleteProductLotUseCase } from './application/commands/hard-ProductLot.usecase';
import { SoftDeleteProductLotUseCase } from './application/commands/soft-ProductLot.usecase';
import { RestoreProductLotUseCase } from './application/commands/restore-ProductLot.usecase';
import { FindOneProductLotUseCase } from './application/queries/findOne-ProductLot.usecase';
import { FindAllProductLotUseCase } from './application/queries/find-ProductLot.usecase';
import { ProductVariantModule } from '../product_variant/product_variant.module';
import { CurrenciesModule } from '../currencies/currencies.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([ProductLotOrm]),
    ProductVariantModule,
    CurrenciesModule,
  ],
  controllers: [ProductLotController],
  providers: [
    { provide: PRODUCT_LOT_REPOSITORY, useClass: ProductLotRepositoryImpl },
    CreateProductLotUseCase,
    UpdateProductLotUseCase,
    HardDeleteProductLotUseCase,
    SoftDeleteProductLotUseCase,
    RestoreProductLotUseCase,
    FindOneProductLotUseCase,
    FindAllProductLotUseCase,
  ],
  exports: [
    { provide: PRODUCT_LOT_REPOSITORY, useClass: ProductLotRepositoryImpl },
    CreateProductLotUseCase,
    UpdateProductLotUseCase,
    HardDeleteProductLotUseCase,
    SoftDeleteProductLotUseCase,
    RestoreProductLotUseCase,
    FindOneProductLotUseCase,
    FindAllProductLotUseCase,
  ],
})
export class ProductLotModule {}
