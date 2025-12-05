import { ProvinceOrm } from 'src/database/typeorm/province.orm-entity';
import { District, Province, Village } from '../domain/address.entity';
import {
  DistrictResponse,
  ProvinceResponse,
  VillageResponse,
} from '../interface/address.interface';
import { DistrictOrm } from 'src/database/typeorm/district.orm-entity';
import { VillageOrm } from 'src/database/typeorm/village.orm-entity';

export const ProvinceMapper = {
  toDomain(schema: ProvinceOrm): Province {
    return new Province({
      id: schema.id,
      name: schema.name,
      name_en: schema.name_en,
    });
  },
  toSchema(domain: Province): ProvinceOrm {
    const schema = new ProvinceOrm();
    if (domain.value.id != null) schema.id = domain.value.id;
    schema.name = domain.value.name;
    if (domain.value.name_en != null) schema.name_en = domain.value.name_en;
    return schema;
  },
  toResponseList(domain: Province[]): ProvinceResponse[] {
    return domain.map((d) => ({
      id: d.value.id!,
      name: d.value.name,
      name_en: d.value.name_en,
    }));
  },
  toResponse(domain: Province): ProvinceResponse {
    return {
      id: domain.value.id!,
      name: domain.value.name,
      name_en: domain.value.name_en,
    };
  },
};

export const DistrictMapper = {
  toDomain(schema: DistrictOrm): District {
    return new District({
      id: schema.id,
      name: schema.name,
      name_en: schema.name_en,
      province: ProvinceMapper.toDomain(schema.province),
    });
  },
  toSchema(domain: District): DistrictOrm {
    const schema = new DistrictOrm();
    if (domain.value.id) schema.id = domain.value.id;
    schema.name = domain.value.name;
    if (domain.value.name_en) schema.name_en = domain.value.name_en;
    if (domain.value.province)
      schema.province = ProvinceMapper.toSchema(domain.value.province);
    return schema;
  },
  toResponseList(domain: District[]): DistrictResponse[] {
    return domain.map((d) => ({
      id: d.value.id!,
      name: d.value.name,
      name_en: d.value.name_en,
      province: d.value.province
        ? ProvinceMapper.toResponse(d.value.province)
        : undefined,
    }));
  },
  toResponse(domain: District): DistrictResponse {
    return {
      id: domain.value.id!,
      name: domain.value.name,
      name_en: domain.value.name_en,
      province: domain.value.province
        ? ProvinceMapper.toResponse(domain.value.province)
        : undefined,
    }
  },
};

export const VillageMapper = {
  toDomain(schema: VillageOrm): Village {
    return new Village({
      id: schema.id,
      name: schema.name,
      name_en: schema.name_en,
      district: DistrictMapper.toDomain(schema.district),
    });
  },
  toSchema(domain: Village): VillageOrm {
    const schema = new VillageOrm();
    if (domain.value.id) schema.id = domain.value.id;
    schema.name = domain.value.name;
    if (domain.value.name_en) schema.name_en = domain.value.name_en;
    if (domain.value.district)
      schema.district = DistrictMapper.toSchema(domain.value.district);
    return schema;
  },
  toResponse(domain: Village): VillageResponse {
    return {
      id: domain.value.id!,
      name: domain.value.name,
      name_en: domain.value.name_en,
      district: domain.value.district
        ? DistrictMapper.toResponse(domain.value.district)
        : undefined,
    }
  },
  toResponseList(domain: Village[]): VillageResponse[] {
    return domain.map((d) => ({
      id: d.value.id!,
      name: d.value.name,
      name_en: d.value.name_en,
      district: d.value.district
        ? DistrictMapper.toResponse(d.value.district)
        : undefined,
    }));
  },
};
