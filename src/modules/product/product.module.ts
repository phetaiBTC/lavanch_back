import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRepositoryImpl } from './infrastructure/product.repository.impl';
import { ProductController } from './product.controller';
import { PRODUCT_REPOSITORY } from './domain/product.repository';
import { CreateProductUseCase } from './application/commands/create-Product.usecase';
import { UpdateProductUseCase } from './application/commands/update-Product.usecase';
import { HardDeleteProductUseCase } from './application/commands/hard-Product.usecase';
import { SoftDeleteProductUseCase } from './application/commands/soft-Product.usecase';
import { RestoreProductUseCase } from './application/commands/restore-Product.usecase';
import { FindOneProductUseCase } from './application/queries/findOne-Product.usecase';
import { FindAllProductUseCase } from './application/queries/find-Product.usecase';
import { ProductOrm } from 'src/database/typeorm/product.orm-entity';
import { ActiveProductUseCase } from './application/commands/active-Product.usecase';
import { CategoryModule } from '../category/category.module';
@Module({
  imports: [TypeOrmModule.forFeature([ProductOrm]), CategoryModule],
  controllers: [ProductController],
  providers: [
    { provide: PRODUCT_REPOSITORY, useClass: ProductRepositoryImpl },
    CreateProductUseCase,
    UpdateProductUseCase,
    HardDeleteProductUseCase,
    SoftDeleteProductUseCase,
    RestoreProductUseCase,
    FindOneProductUseCase,
    FindAllProductUseCase,
    ActiveProductUseCase,
  ]
  ,
  exports: [
    { provide: PRODUCT_REPOSITORY, useClass: ProductRepositoryImpl },
    CreateProductUseCase,
    UpdateProductUseCase,
    HardDeleteProductUseCase,
    SoftDeleteProductUseCase,
    RestoreProductUseCase,
    FindOneProductUseCase,
    FindAllProductUseCase,
    ActiveProductUseCase,
  ]
})

export class ProductModule {}
