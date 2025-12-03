import { Branch } from '../domain/branch.entity';
import { BranchesOrm } from 'src/database/typeorm/branches.orm-entity';
import { BranchResponse } from '../interface/branch.interface';
import { formatDate } from 'src/shared/utils/dayjs.util';
import {
  IPagination,
  PaginatedResponse,
} from 'src/shared/interface/pagination.interface';

export const BranchMapper = {
  toDomain(schema: BranchesOrm): Branch {
    return new Branch({
      id: schema.id,
      name: schema.name,
      address: schema.address,
      village_id: schema.village_id,
      phone: schema.phone,
      facebook: schema.facebook,
      tiktok: schema.tiktok,
      shifts_id: schema.shifts_id,
      is_active: schema.is_active,
      wallet_balance: Number(schema.wallet_balance),
      createdAt: schema.createdAt,
      updatedAt: schema.updatedAt,
      deletedAt: schema.deletedAt,
    });
  },

  toSchema(domain: Branch): BranchesOrm {
    const schema = new BranchesOrm();
    if (domain.value.id != null) schema.id = domain.value.id;
    schema.name = domain.value.name;
    if (domain.value.address) schema.address = domain.value.address;
    if (domain.value.village_id) schema.village_id = domain.value.village_id;
    if (domain.value.phone) schema.phone = domain.value.phone;
    if (domain.value.facebook) schema.facebook = domain.value.facebook;
    if (domain.value.tiktok) schema.tiktok = domain.value.tiktok;
    if (domain.value.shifts_id) schema.shifts_id = domain.value.shifts_id;
    schema.is_active = domain.value.is_active;
    schema.wallet_balance = domain.value.wallet_balance;
    return schema;
  },

  toResponse(domain: Branch, ormEntity?: BranchesOrm): BranchResponse {
    const village = ormEntity?.village;
    const district = village?.district;
    const province = district?.province;
    return {
      id: domain.value.id!,
      name: domain.value.name,
      address: domain.value.address ?? null,
      village_id: domain.value.village_id ?? null,
      village: village
        ? {
            id: village.id,
            name: village.name,
            name_en: village.name_en,
            district: district
              ? {
                  id: district.id,
                  name: district.name,
                  name_en: district.name_en,
                  province: province
                    ? {
                        id: province.id,
                        name: province.name,
                        name_en: province.name_en,
                      }
                    : ({} as any),
                }
              : ({} as any),
          }
        : undefined,
      full_address: village
        ? {
            village_name: village.name_en || village.name || null,
            district_name: district?.name_en || district?.name || null,
            province_name: province?.name_en || province?.name || null,
          }
        : undefined,
      phone: domain.value.phone ?? null,
      facebook: domain.value.facebook ?? null,
      tiktok: domain.value.tiktok ?? null,
      shifts_id: domain.value.shifts_id ?? null,
      is_active: domain.value.is_active,
      wallet_balance: domain.value.wallet_balance,
      createdAt: formatDate(domain.value.createdAt),
      updatedAt: formatDate(domain.value.updatedAt),
      deletedAt: domain.value.deletedAt
        ? formatDate(domain.value.deletedAt)
        : null,
    };
  },

  toResponseList(domain: {
    data: (Branch & { _orm?: BranchesOrm })[];
    pagination: IPagination;
  }): PaginatedResponse<BranchResponse> {
    return {
      data: domain.data.map((item) =>
        this.toResponse(item, (item as any)._orm),
      ),
      pagination: domain.pagination,
    };
  },
};
