import { Unit } from '../domain/unit.entity';
import { UnitOrm } from 'src/database/typeorm/unit.orm-entity';
import { UnitResponse } from '../interface/unit.interface';
import { BaseMapper } from 'src/shared/BaseModule/infrastructure/base.mapper';

class UnitMapperClass extends BaseMapper<Unit, UnitOrm, UnitResponse> {
  toDomain = (schema: UnitOrm): Unit => {
    return new Unit({
      id: schema.id,
      name: schema.name,
      name_en: schema.name_en,
      abbreviation: schema.abbreviation,
      is_active: schema.is_active,
      ...this.getTimestampsFromSchema(schema),
    });
  };

  toSchema = (domain: Unit): UnitOrm => {
    const schema = new UnitOrm();
    if (domain.value.id != null) schema.id = domain.value.id;
    if (domain.value.name != null) schema.name = domain.value.name;
    if (domain.value.name_en != null) schema.name_en = domain.value.name_en;
    if (domain.value.abbreviation != null)
      schema.abbreviation = domain.value.abbreviation;
    if (domain.value.is_active != null)
      schema.is_active = domain.value.is_active;
    return schema;
  };

  toResponse = (domain: Unit): UnitResponse => {
    return {
      id: domain.value.id!,
      name: domain.value.name,
      name_en: domain.value.name_en,
      abbreviation: domain.value.abbreviation,
      is_active: domain.value.is_active,
      ...this.getFormattedTimestamps(domain),
    };
  };
}

export const UnitMapper = new UnitMapperClass();
