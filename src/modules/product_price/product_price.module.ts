import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductPriceRepositoryImpl } from './infrastructure/product_price.repository.impl';
import { ProductPriceController } from './product_price.controller';
import { PRODUCT_PRICE_REPOSITORY } from './domain/product_price.repository';
import { ProductPriceOrm } from 'src/database/typeorm/product_price.orm-entity';
import { CreateProductPriceUseCase } from './application/commands/create-ProductPrice.usecase';
import { UpdateProductPriceUseCase } from './application/commands/update-ProductPrice.usecase';
import { HardDeleteProductPriceUseCase } from './application/commands/hard-ProductPrice.usecase';
import { SoftDeleteProductPriceUseCase } from './application/commands/soft-ProductPrice.usecase';
import { RestoreProductPriceUseCase } from './application/commands/restore-ProductPrice.usecase';
import { FindOneProductPriceUseCase } from './application/queries/findOne-ProductPrice.usecase';
import { FindAllProductPriceUseCase } from './application/queries/find-ProductPrice.usecase';
@Module({
  imports: [TypeOrmModule.forFeature([ProductPriceOrm])],
  controllers: [ProductPriceController],
  providers: [
    { provide: PRODUCT_PRICE_REPOSITORY, useClass: ProductPriceRepositoryImpl },
    CreateProductPriceUseCase,
    UpdateProductPriceUseCase,
    HardDeleteProductPriceUseCase,
    SoftDeleteProductPriceUseCase,
    RestoreProductPriceUseCase,
    FindOneProductPriceUseCase,
    FindAllProductPriceUseCase,
  ],
    exports: [
        CreateProductPriceUseCase,
        UpdateProductPriceUseCase,
        HardDeleteProductPriceUseCase,
        SoftDeleteProductPriceUseCase,
        RestoreProductPriceUseCase,
        FindOneProductPriceUseCase,
        FindAllProductPriceUseCase,
    ],
})
export class ProductPriceModule {}
