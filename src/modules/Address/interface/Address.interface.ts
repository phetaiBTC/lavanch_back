import { District, Province } from '../domain/Address.entity';

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
