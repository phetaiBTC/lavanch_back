import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProvinceOrm } from 'src/database/typeorm/province.orm-entity';
import { DistrictOrm } from 'src/database/typeorm/district.orm-entity';
import { VillageOrm } from 'src/database/typeorm/village.orm-entity';
import { AddressController } from './address.controller';
import { AddressRepositoryImpl } from './infrastructure/address.repository.impl';
import { ADDRESS_REPOSITORY } from './domain/address.repository';
import { GetProvinceUseCase } from './application/queries/get-Province.usecase';
import { GetDistrictUseCase } from './application/queries/get-District.usecase';
import { GetVillageUseCase } from './application/queries/get-Village.usecase';
@Module({
  imports: [TypeOrmModule.forFeature([ProvinceOrm, DistrictOrm, VillageOrm])],
  controllers: [AddressController],
  providers: [
    {
      provide: ADDRESS_REPOSITORY,
      useClass: AddressRepositoryImpl,
    },
    GetProvinceUseCase,
    GetDistrictUseCase,
    GetVillageUseCase,
  ],
})
export class AddressModule {}
