import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import {
  POINT_REPOSITORY,
  type IPointRepository,
} from '../../domain/point.repository';
import { Point } from '../../domain/point.entity';
import { CreatePointDto } from '../../dto/create-Point.dto';

@Injectable()
export class CreatePointUseCase {
  constructor(
    @Inject(POINT_REPOSITORY)
    private readonly pointRepo: IPointRepository,
  ) {}

  async execute(dto: CreatePointDto): Promise<Point> {
    const existing = await this.pointRepo.findByName(dto.name);
    if (existing) throw new BadRequestException('Point name already exists');

    const point = new Point({
      name: dto.name,
      points_multiplier: dto.points_multiplier ?? 1.0,
      name_code: dto.name_code
    });

    return this.pointRepo.save(point);
  }
}
