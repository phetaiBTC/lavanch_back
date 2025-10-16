import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IAddressRepository } from '../domain/Address.repository';
import { ProvinceOrm } from 'src/database/typeorm/province.orm-entity';
import { District, Province, Village } from '../domain/Address.entity';
import {
  DistrictMapper,
  ProvinceMapper,
  VillageMapper,
} from './Address.mapper';
import { DistrictOrm } from 'src/database/typeorm/district.orm-entity';
import { VillageOrm } from 'src/database/typeorm/village.orm-entity';

@Injectable()
export class AddressRepositoryImpl implements IAddressRepository {
  constructor(
    @InjectRepository(ProvinceOrm)
    private readonly provinceRepository: Repository<ProvinceOrm>,
    @InjectRepository(DistrictOrm)
    private readonly districtRepository: Repository<DistrictOrm>,
    @InjectRepository(VillageOrm)
    private readonly villageRepository: Repository<VillageOrm>,
  ) {}
  async getProvince(): Promise<Province[]> {
    const provinces = await this.provinceRepository.find();
    return provinces.map((province) => ProvinceMapper.toDomain(province));
  }

  async getDistrict(provinceId: number): Promise<District[]> {
    const districts = await this.districtRepository.find({
      where: { province: { id: provinceId } },
      relations: ['province'],
    });
    return districts.map((district) => DistrictMapper.toDomain(district));
  }

  async getVillage(districtId: number): Promise<Village[]> {
    const villages = await this.villageRepository.find({
      where: { district: { id: districtId } },
      relations: ['district', 'district.province'],
    });
    return villages.map((village) => VillageMapper.toDomain(village));
  }
}
