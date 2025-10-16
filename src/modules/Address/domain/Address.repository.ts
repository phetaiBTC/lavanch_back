import { District, Province, Village } from "./Address.entity";

export const Address_REPOSITORY = Symbol(
  'Address_REPOSITORY'.toLocaleUpperCase(),
);

export interface IAddressRepository {
  getProvince(): Promise<Province[]>;
  getDistrict(provinceId: number): Promise<District[]>;
  getVillage(districtId: number): Promise<Village[]>;
}
