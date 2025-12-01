import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ISuppliersRepository } from '../domain/suppliers.repository';
import { SuppliersOrm } from 'src/database/typeorm/suppliers.orm-entity';
import { BaseRepository } from 'src/shared/BaseModule/infrastructure/base.repository.impl';
import { Suppliers } from '../domain/suppliers.entity';
import { SuppliersMapper } from './suppliers.mapper';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
@Injectable()
export class SuppliersRepositoryImpl
  extends BaseRepository<Suppliers, SuppliersOrm, any>
  implements ISuppliersRepository
{
  constructor(
    @InjectRepository(SuppliersOrm)
    protected readonly suppliersRepo: Repository<SuppliersOrm>,
  ) {
    super(suppliersRepo, SuppliersMapper, 'suppliers', 'name');
  }

  async findByName(name: string): Promise<Suppliers | null> {
    return this.findByField('name', name);
  }
  async findAll(query: PaginationDto): Promise<PaginatedResponse<Suppliers>> {
    return super.findAll(query, [
      { relation: 'suppliers.village', as: 'village' }
    ]);
  }
}
