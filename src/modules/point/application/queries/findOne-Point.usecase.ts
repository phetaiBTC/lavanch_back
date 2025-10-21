import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  POINT_REPOSITORY,
  type IPointRepository,
} from '../../domain/point.repository';
import { Point } from '../../domain/point.entity';
@Injectable()
export class FindOnePointUseCase {
  constructor(
    @Inject(POINT_REPOSITORY) private readonly pointRepo: IPointRepository,
  ) {}
  async execute(id: number): Promise<Point> {
    const point = await this.pointRepo.findById(id);
    if (!point) throw new NotFoundException('Point not found');
    return point;
  }
}
