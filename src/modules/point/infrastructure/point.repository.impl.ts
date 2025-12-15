import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PointOrm } from 'src/database/typeorm/point.orm-entity';
import { Point } from '../domain/point.entity';
import { PointMapper } from './point.mapper';
import { IPointRepository } from '../domain/point.repository';
import { PointResponse } from '../interface/point.interface';
import { PointNameCode } from 'src/shared/enum/point-name-code';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { BaseRepository } from 'src/shared/BaseModule/infrastructure/base.repository.impl';

@Injectable()
export class PointRepositoryImpl
  extends BaseRepository<Point, PointOrm, PointResponse>
  implements IPointRepository
{
  constructor(
    @InjectRepository(PointOrm)
    private readonly pointRepo: Repository<PointOrm>,
  ) {
    super({
      repository: pointRepo,
      mapper: PointMapper,
      searchField: 'name',
    });
  }
  override createQueryBuilder(): SelectQueryBuilder<PointOrm> {
    return this.pointRepo.createQueryBuilder('point');
  }

  async findByName(name: string): Promise<Point | null> {
    return this.findByField('name', name);
  }

  async findByNameCode(name_code: PointNameCode): Promise<Point | null> {
    return this.findByField('name_code', name_code);
  }
}
