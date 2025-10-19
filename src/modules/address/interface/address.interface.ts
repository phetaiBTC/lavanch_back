import { District, Province } from '../domain/address.entity';

// Province
export interface ProvinceProps {
  id?: number;
  name: string;
  name_en: string;
}
export interface ProvinceResponse {
  id: number;
  name: string;
  name_en?: string;
}

// District
export interface DistrictProps {
  id?: number;
  name: string;
  name_en: string;
  province?: Province;
}
export interface DistrictResponse {
  id: number;
  name: string;
  name_en?: string;
  province?: Province;
}

// Village
export interface VillageProps {
  id?: number;
  name: string;
  name_en: string;
  district?: District;
}
export interface VillageResponse {
  id: number;
  name: string;
  name_en?: string;
  district?: District;
}
