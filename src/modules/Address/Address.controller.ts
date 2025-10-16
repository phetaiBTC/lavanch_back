import { Controller, Get, Param } from '@nestjs/common';
import { GetProvinceUseCase } from './application/queries/get-Province.usecase';
import { GetDistrictUseCase } from './application/queries/get-District.usecase';
import { GetVillageUseCase } from './application/queries/get-Village.usecase';
import {
  DistrictResponse,
  ProvinceResponse,
  VillageResponse,
} from './interface/Address.interface';
import {
  DistrictMapper,
  ProvinceMapper,
  VillageMapper,
} from './infrastructure/Address.mapper';

@Controller('address')
export class AddressController {
  constructor(
    private readonly getProvinceUseCase: GetProvinceUseCase,
    private readonly getDistrictUseCase: GetDistrictUseCase,
    private readonly getVillageUseCase: GetVillageUseCase,
  ) {}
  @Get('province')
  async getProvince(): Promise<ProvinceResponse[]> {
    return ProvinceMapper.toResponse(await this.getProvinceUseCase.execute());
  }
  @Get('district/:id')
  async getDistrict(
    @Param('id') provinceId: number,
  ): Promise<DistrictResponse[]> {
    return DistrictMapper.toResponse(
      await this.getDistrictUseCase.execute(provinceId),
    );
  }
  @Get('village/:id')
  async getVillage(@Param('id') id: number): Promise<VillageResponse[]> {
    return VillageMapper.toResponse(await this.getVillageUseCase.execute(id));
  }
}
