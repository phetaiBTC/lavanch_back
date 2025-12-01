import { District, Province, Village } from './address.entity';

export const ADDRESS_REPOSITORY = Symbol('ADDRESS_REPOSITORY');

export interface IAddressRepository {
  getProvince(): Promise<Province[]>;
  getDistrict(provinceId: number): Promise<District[]>;
  getVillage(districtId: number): Promise<Village[]>;
}
