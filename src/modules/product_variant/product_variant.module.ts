import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductVariantRepositoryImpl } from './infrastructure/product_variant.repository.impl';
import { ProductVariantController } from './product_variant.controller';
import { PRODUCT_VARIANT_REPOSITORY } from './domain/product_variant.repository';
import { CreateProductVariantUseCase } from './application/commands/create-ProductVariant.usecase';
import { UpdateProductVariantUseCase } from './application/commands/update-ProductVariant.usecase';
import { HardDeleteProductVariantUseCase } from './application/commands/hard-ProductVariant.usecase';
import { SoftDeleteProductVariantUseCase } from './application/commands/soft-ProductVariant.usecase';
import { RestoreProductVariantUseCase } from './application/commands/restore-ProductVariant.usecase';
import { FindOneProductVariantUseCase } from './application/queries/findOne-ProductVariant.usecase';
import { FindAllProductVariantUseCase } from './application/queries/find-ProductVariant.usecase';
import { ProductVariantOrm } from 'src/database/typeorm/product-variant.orm-entity';
import { ActiveProductVariantUseCase } from './application/commands/active-ProductVariant.usecase';
import { ProductModule } from '../product/product.module';
import { UnitModule } from '../unit/unit.module';
import { UniqueValidatorService } from 'src/shared/utils/pass.notfound.util';
import { FindBarcodeProductVariantUseCase } from './application/queries/find-barcodeProductVariant.usecase';
import { FindNameProductVariantUseCase } from './application/queries/find-nameProductVarinat.usecase';
@Module({
  imports: [
    TypeOrmModule.forFeature([ProductVariantOrm]),
    ProductModule,
    UnitModule,
  ],
  controllers: [ProductVariantController],
  providers: [
    {
      provide: PRODUCT_VARIANT_REPOSITORY,
      useClass: ProductVariantRepositoryImpl,
    },
    CreateProductVariantUseCase,
    UpdateProductVariantUseCase,
    HardDeleteProductVariantUseCase,
    SoftDeleteProductVariantUseCase,
    RestoreProductVariantUseCase,
    FindOneProductVariantUseCase,
    FindAllProductVariantUseCase,
    ActiveProductVariantUseCase,
    UniqueValidatorService,
    FindBarcodeProductVariantUseCase,
    FindNameProductVariantUseCase,
  ],
  exports: [
    {
      provide: PRODUCT_VARIANT_REPOSITORY,
      useClass: ProductVariantRepositoryImpl,
    },
    CreateProductVariantUseCase,
    UpdateProductVariantUseCase,
    HardDeleteProductVariantUseCase,
    SoftDeleteProductVariantUseCase,
    RestoreProductVariantUseCase,
    FindOneProductVariantUseCase,
    FindAllProductVariantUseCase,
    ActiveProductVariantUseCase,
  ],
})
export class ProductVariantModule {}
