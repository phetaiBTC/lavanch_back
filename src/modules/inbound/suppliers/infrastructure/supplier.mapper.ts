import { Injectable } from '@nestjs/common';
import { SuppliersOrm } from 'src/database/typeorm/suppliers.orm-entity';
import { Supplier } from '../domain/supplier.entity';
import { VillageOrm } from 'src/database/typeorm/village.orm-entity';
import { SupplierResponse } from '../interface/suppliers.interface';
import { formatDate } from 'src/shared/utils/dayjs.util';

@Injectable()
export class SupplierMapper {
  toDomain(supplier: SuppliersOrm): Supplier {
    return new Supplier({
      id: supplier.id,
      name: supplier.name,
      phone: supplier.phone,
      address: supplier.address,
      email: supplier.email,
      is_active: supplier.is_active,
      contact_person: supplier.contact_person,
      vaillage_id: supplier.village?.id,
    });
  }
  toSchema(supplier: Supplier, orm: { village: VillageOrm }): SuppliersOrm {
    const supplierSchema = new SuppliersOrm();
    if (supplier.id) supplierSchema.id = supplier.id;
    supplierSchema.name = supplier.name;
    supplierSchema.phone = supplier.phone;
    supplierSchema.address = supplier.address;
    supplierSchema.email = supplier.email;
    supplierSchema.is_active = supplier.is_active;
    supplierSchema.contact_person = supplier.contact_person;
    if (supplier.vaillage_id) supplierSchema.village = orm.village;
    return supplierSchema;
  }
  toResponse(supplier: SuppliersOrm): SupplierResponse {
    return {
      id: supplier.id,
      name: supplier.name,
      phone: supplier.phone,
      address: supplier.address,
      email: supplier.email,
      is_active: supplier.is_active,
      contact_person: supplier.contact_person,
      vaillage_id: supplier.village,
      createdAt: formatDate(supplier.createdAt),
      updatedAt: formatDate(supplier.updatedAt),
      deletedAt: supplier.deletedAt ? formatDate(supplier.deletedAt) : null,
    };
  }
}
