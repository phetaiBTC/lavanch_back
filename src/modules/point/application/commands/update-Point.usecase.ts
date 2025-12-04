import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import {
  POINT_REPOSITORY,
  type IPointRepository,
} from '../../domain/point.repository';
import { Point } from '../../domain/point.entity';
import { UpdatePointDto } from '../../dto/update-Point.dto';
import { FindOnePointUseCase } from '../queries/findOne-Point.usecase';

@Injectable()
export class UpdatePointUseCase {
  constructor(
    @Inject(POINT_REPOSITORY)
    private readonly pointRepo: IPointRepository,
    private readonly usecaseFIndOnePoint: FindOnePointUseCase,
  ) {}

  async execute(id: number, dto: UpdatePointDto): Promise<Point> {
    const point = await this.validation_point(id, dto);
    return this.pointRepo.save(point);
  }

  async validation_point(id: number, dto: UpdatePointDto): Promise<Point> {
    const point = await this.usecaseFIndOnePoint.execute(id);

    const existing = await this.pointRepo.findByName(dto.name);
    if (existing && existing.value.id !== id) {
      throw new BadRequestException('Point name already exists');
    }

    if (dto.name !== undefined) {
      point.update({ name: dto.name });
    }

    if (dto.points_multiplier !== undefined) {
      point.update({ points_multiplier: dto.points_multiplier });
    }
    return point;
  }
}
