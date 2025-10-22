import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  POINT_REPOSITORY,
  type IPointRepository,
} from '../../domain/point.repository';
import { Point } from '../../domain/point.entity';
import { PointNameCode } from 'src/shared/enum/point-name-code';
@Injectable()
export class FindNameCodePointUseCase {
  constructor(
    @Inject(POINT_REPOSITORY) private readonly pointRepo: IPointRepository,
  ) {}
  async execute(code: PointNameCode): Promise<Point> {
    const point = await this.pointRepo.findByNameCode(code);
    if (!point) throw new NotFoundException('Point not found');
    return point;
  }
}
