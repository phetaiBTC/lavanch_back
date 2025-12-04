import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductPointRepositoryImpl } from './infrastructure/product_point.repository.impl';
import { ProductPointController } from './product_point.controller';
import { PRODUCT_POINT_REPOSITORY } from './domain/product_point.repository';
import { ProductPointOrm } from 'src/database/typeorm/product_point.orm-entity';
import { CreateProductPointUseCase } from './application/commands/create-ProductPoint.usecase';
import { UpdateProductPointUseCase } from './application/commands/update-ProductPoint.usecase';
import { HardDeleteProductPointUseCase } from './application/commands/hard-ProductPoint.usecase';
import { SoftDeleteProductPointUseCase } from './application/commands/soft-ProductPoint.usecase';
import { RestoreProductPointUseCase } from './application/commands/restore-ProductPoint.usecase';
import { FindOneProductPointUseCase } from './application/queries/findOne-ProductPoint.usecase';
import { FindAllProductPointUseCase } from './application/queries/find-ProductPoint.usecase';
import { ProductVariantModule } from '../product_variant/product_variant.module';
import { UnitModule } from '../unit/unit.module';
import { PointModule } from '../point/point.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([ProductPointOrm]),
    ProductVariantModule,
    UnitModule,
    PointModule,
  ],
  controllers: [ProductPointController],
  providers: [
    { provide: PRODUCT_POINT_REPOSITORY, useClass: ProductPointRepositoryImpl },
    CreateProductPointUseCase,
    UpdateProductPointUseCase,
    HardDeleteProductPointUseCase,
    SoftDeleteProductPointUseCase,
    RestoreProductPointUseCase,
    FindOneProductPointUseCase,
    FindAllProductPointUseCase,
  ],
})
export class ProductPointModule {}
