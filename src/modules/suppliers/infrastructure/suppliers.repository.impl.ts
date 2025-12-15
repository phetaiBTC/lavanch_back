import { Injectable } from '@nestjs/common';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ISuppliersRepository } from '../domain/suppliers.repository';
import { SuppliersOrm } from 'src/database/typeorm/suppliers.orm-entity';
import { Suppliers } from '../domain/suppliers.entity';
import { SuppliersMapper } from './suppliers.mapper';
import { BaseRepository } from 'src/shared/BaseModule/infrastructure/base.repository.impl';
@Injectable()
export class SuppliersRepositoryImpl
  extends BaseRepository<Suppliers, SuppliersOrm, any>
  implements ISuppliersRepository
{
  constructor(
    @InjectRepository(SuppliersOrm)
    protected readonly suppliersRepo: Repository<SuppliersOrm>,
  ) {
    super({
      repository: suppliersRepo,
      mapper: SuppliersMapper,
      searchField: 'suppliers.name',
    });
  }
  createQueryBuilder(): SelectQueryBuilder<SuppliersOrm> {
    return this.suppliersRepo
      .createQueryBuilder('suppliers')
      .leftJoinAndSelect('suppliers.village', 'village')
      .leftJoinAndSelect('village.district', 'district')
      .leftJoinAndSelect('district.province', 'province');
  }
  async findByName(name: string): Promise<Suppliers | null> {
    return this.findByField('name', name);
  }
}
