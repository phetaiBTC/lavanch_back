import { Module } from '@nestjs/common';import { TypeOrmModule } from '@nestjs/typeorm';import { TieredPriceRepositoryImpl } from './infrastructure/tiered_price.repository.impl';import { TieredPriceController } from './tiered_price.controller';import { TIERED_PRICE_REPOSITORY } from './domain/tiered_price.repository';import { TieredPriceOrm } from 'src/database/typeorm/tiered_price.orm-entity';
import {CreateTieredPriceUseCase} from './application/commands/create-TieredPrice.usecase';
import {UpdateTieredPriceUseCase} from './application/commands/update-TieredPrice.usecase';
import {HardDeleteTieredPriceUseCase} from './application/commands/hard-TieredPrice.usecase';
import {SoftDeleteTieredPriceUseCase} from './application/commands/soft-TieredPrice.usecase';
import {RestoreTieredPriceUseCase} from './application/commands/restore-TieredPrice.usecase';
import {FindOneTieredPriceUseCase} from './application/queries/findOne-TieredPrice.usecase';
import {FindAllTieredPriceUseCase} from './application/queries/find-TieredPrice.usecase';
@Module({imports: [TypeOrmModule.forFeature([TieredPriceOrm])],controllers: [TieredPriceController], providers: [{provide: TIERED_PRICE_REPOSITORY,useClass: TieredPriceRepositoryImpl},CreateTieredPriceUseCase,UpdateTieredPriceUseCase,HardDeleteTieredPriceUseCase,SoftDeleteTieredPriceUseCase,RestoreTieredPriceUseCase,FindOneTieredPriceUseCase,FindAllTieredPriceUseCase]}) export class TieredPriceModule {}