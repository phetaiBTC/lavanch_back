import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IUnitRepository } from '../domain/unit.repository';
import { Unit } from '../domain/unit.entity';
import { UnitMapper } from './unit.mapper';
import { UnitOrm } from 'src/database/typeorm/unit.orm-entity';
import { BaseRepository } from 'src/shared/BaseModule/infrastructure/base.repository.impl';
import { SelectQueryBuilder } from 'typeorm/browser';

@Injectable()
export class UnitRepositoryImpl
  extends BaseRepository<Unit, UnitOrm, any>
  implements IUnitRepository
{
  constructor(
    @InjectRepository(UnitOrm)
    protected readonly unitRepo: Repository<UnitOrm>,
  ) {
    super({
      repository: unitRepo,
      mapper: UnitMapper,
      searchField: 'name',
    });
  }
  override createQueryBuilder(): SelectQueryBuilder<UnitOrm> {
    return this.unitRepo
      .createQueryBuilder('unit')
      .leftJoinAndSelect('unit.village', 'village')
      .leftJoinAndSelect('village.district', 'district')
      .leftJoinAndSelect('district.province', 'province');
  }
  async findByName(name: string): Promise<Unit | null> {
    return this.findByField('name', name);
  }
}
