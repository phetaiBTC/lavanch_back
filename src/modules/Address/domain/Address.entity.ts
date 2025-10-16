import {
  DistrictProps,
  ProvinceProps,
  VillageProps,
} from '../interface/Address.interface';

// Province
export class Province {
  private id?: number;
  private name: string;
  private name_en?: string;
  constructor(props: ProvinceProps) {
    this.id = props.id;
    this.name = props.name;
    this.name_en = props.name_en;
  }
  get value() {
    return {
      id: this.id,
      name: this.name,
      name_en: this.name_en,
    };
  }
}

// District
export class District {
  private id?: number;
  private name: string;
  private name_en?: string;
  private province?: Province;
  constructor(props: DistrictProps) {
    this.id = props.id;
    this.name = props.name;
    this.name_en = props.name_en;
    this.province = props.province;
  }
  get value() {
    return {
      id: this.id,
      name: this.name,
      name_en: this.name_en,
      province: this.province,
    };
  }
}

// Village
export class Village {
  private id?: number;
  private name: string;
  private name_en?: string;
  private district?: District;
  constructor(props: VillageProps) {
    this.id = props.id;
    this.name = props.name;
    this.name_en = props.name_en;
    this.district = props.district;
  }
  get value() {
    return {
      id: this.id,
      name: this.name,
      name_en: this.name_en,
      district: this.district,
    };
  }
}
