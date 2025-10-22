

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PointOrm } from 'src/database/typeorm/point.orm-entity';
import { Point } from '../domain/point.entity';
import { PointMapper } from './point.mapper';
import { IPointRepository } from '../domain/point.repository';
import { PointResponse } from '../interface/point.interface';
import { PointNameCode } from 'src/shared/enum/point-name-code';
import { BaseRepository } from 'src/shared/BaseModule/infrastructure/base.repository.impl';
import { Repository } from 'typeorm';

@Injectable()
export class PointRepositoryImpl
  extends BaseRepository<Point, PointOrm, PointResponse>
  implements IPointRepository
{
  constructor(
    @InjectRepository(PointOrm)
    pointRepo: Repository<PointOrm>,
  ) {
    super(pointRepo, PointMapper, 'point', 'name');
  }

  async findByName(name: string): Promise<Point | null> {
    return this.findByField('name', name);
  }

  async findByNameCode(name_code: PointNameCode): Promise<Point | null> {
    return this.findByField('name_code', name_code);
  }
}
