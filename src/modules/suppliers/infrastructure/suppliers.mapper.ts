import { SuppliersResponse } from '../interface/suppliers.interface';
import { SuppliersOrm } from 'src/database/typeorm/suppliers.orm-entity';
import { BaseMapper } from 'src/shared/BaseModule/infrastructure/base.mapper';
import { Suppliers } from '../domain/suppliers.entity';
import { ProvinceMapper, VillageMapper } from 'src/modules/address/infrastructure/address.mapper';
class SuppliersMapperClass extends BaseMapper<
  Suppliers,
  SuppliersOrm,
  SuppliersResponse
> {
  toDomain = (schema: SuppliersOrm): Suppliers => {
    return new Suppliers({
      id: schema.id,
      name: schema.name,
      email: schema.email,
      phone: schema.phone,
      is_active: schema.is_active,
      contact_person: schema.contact_person,
      address: schema.address,
      village: schema.village ? VillageMapper.toDomain(schema.village) : undefined,
      ...this.getTimestampsFromSchema(schema),
    });
  };

  toSchema = (domain: Suppliers): SuppliersOrm => {
    const schema = new SuppliersOrm();

    if (domain.value.id != null) schema.id = domain.value.id;
    schema.name = domain.value.name;
    schema.address = domain.value.address;
    schema.email = domain.value.email;
    schema.phone = domain.value.phone;
    schema.is_active = domain.value.is_active;
    schema.contact_person = domain.value.contact_person;
    if (domain.value.village)
      schema.village = domain.value.village
        ? VillageMapper.toSchema(domain.value.village)
        : undefined;
    if (domain.value.name != null) schema.name = domain.value.name;

    return schema;
  };

  toResponse = (domain: Suppliers): SuppliersResponse => {
    return {
      id: domain.value.id!,
      email: domain.value.email,
      phone: domain.value.phone,
      contact_person: domain.value.contact_person,
      address: domain.value.address,
      is_active: domain.value.is_active,
      village: domain.value.village
        ? VillageMapper.toResponse(domain.value.village)
        : undefined,
      name: domain.value.name,
      ...this.getFormattedTimestamps(domain),
    };
  };
}

export const SuppliersMapper = new SuppliersMapperClass();
