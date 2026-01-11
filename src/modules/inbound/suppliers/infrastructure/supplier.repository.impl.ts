import { Injectable } from '@nestjs/common';
import { ISupplierRepository } from '../domain/supplier.repository';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
import { SupplierResponse } from '../interface/suppliers.interface';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { SuppliersOrm } from 'src/database/typeorm/suppliers.orm-entity';
import { InjectRepository } from '@nestjs/typeorm';
import { fetchWithPagination } from 'src/shared/utils/pagination.util';
import { SupplierMapper } from './supplier.mapper';
import { Supplier } from '../domain/supplier.entity';
import { VillageOrm } from 'src/database/typeorm/village.orm-entity';

@Injectable()
export class SupplierRepositoryImpl implements ISupplierRepository {
  constructor(
    @InjectRepository(SuppliersOrm)
    private readonly repo: Repository<SuppliersOrm>,
    private mapper: SupplierMapper,
    @InjectRepository(VillageOrm)
    private readonly villageRepo: Repository<VillageOrm>,
  ) {}

  createQueryBuilder(): SelectQueryBuilder<SuppliersOrm> {
    return this.repo
      .createQueryBuilder('suppliers')
      .leftJoinAndSelect('suppliers.village', 'village')
      .leftJoinAndSelect('village.district', 'district')
      .leftJoinAndSelect('district.province', 'province');
  }

  findAll(query: PaginationDto): Promise<PaginatedResponse<SupplierResponse>> {
    const qb = this.createQueryBuilder();
    return fetchWithPagination({
      qb,
      page: query.page || 1,
      type: query.type,
      search: { kw: query.search, field: 'name' },
      is_active: query.is_active,
      sort: query.sort,
      limit: query.limit || 10,
      toDomain: this.mapper.toResponse,
    });
  }

  async save(domain: Supplier): Promise<void> {
    const village = await this.villageRepo.findOneByOrFail({
      id: domain.vaillage_id,
    });
    // console.log(domain.vaillage_id);
    const toSchema = this.mapper.toSchema(domain, {
      village: village,
    });
    await this.repo.save(toSchema);
  }

  async findById(id: number): Promise<SupplierResponse | null> {
    const supplier = await this.createQueryBuilder().where({ id }).getOne();
    return supplier ? this.mapper.toResponse(supplier) : null;
  }

  async loadById(id: number): Promise<Supplier | null> {
    const supplier = await this.createQueryBuilder()
      .withDeleted()
      .where({ id })
      .getOne();
    return supplier ? this.mapper.toDomain(supplier) : null;
  }

  async hardDelete(id: number[]): Promise<void> {
    await this.repo.delete(id);
  }

  async softDelete(id: number[]): Promise<void> {
    await this.repo.softDelete(id);
  }

  async restore(id: number[]): Promise<void> {
    await this.repo.restore(id);
  }

  async load(id: number): Promise<Supplier | null> {
    const supplier = await this.repo.findOne({
      where: { id },
      withDeleted: true,
    });
    return supplier ? this.mapper.toDomain(supplier) : null;
  }
}
