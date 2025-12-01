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
  toResponse(domain: Province[]): ProvinceResponse[] {
    return domain.map((d) => ({
      id: d.value.id!,
      name: d.value.name,
      name_en: d.value.name_en,
    }));
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
  toResponse(domain: District[]): DistrictResponse[] {
    return domain.map((d) => ({
      id: d.value.id!,
      name: d.value.name,
      name_en: d.value.name_en,
      province: d.value.province
        ? {
            id: d.value.province.value.id!,
            name: d.value.province.value.name,
            name_en: d.value.province.value.name_en,
          }
        : undefined,
    }));
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
  toResponse(domain: Village[]): VillageResponse[] {
    return domain.map((d) => ({
      id: d.value.id!,
      name: d.value.name,
      name_en: d.value.name_en,
      district: d.value.district
        ? {
            id: d.value.district.value.id!,
            name: d.value.district.value.name,
            name_en: d.value.district.value.name_en,
            province: d.value.district.value.province
              ? {
                  id: d.value.district.value.province.value.id!,
                  name: d.value.district.value.province.value.name,
                  name_en: d.value.district.value.province.value.name_en,
                }
              : undefined,
          }
        : undefined,
    }));
  },
};
