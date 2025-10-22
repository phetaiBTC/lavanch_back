import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import {
  POINT_REPOSITORY,
  type IPointRepository,
} from '../../domain/point.repository';
import { Point } from '../../domain/point.entity';
import { UpdatePointDto } from '../../dto/update-Point.dto';

@Injectable()
export class UpdatePointUseCase {
  constructor(
    @Inject(POINT_REPOSITORY)
    private readonly pointRepo: IPointRepository,
  ) {}

  async execute(id: number, dto: UpdatePointDto): Promise<Point> {
    const point = await this.pointRepo.findById(id);
    if (!point) throw new BadRequestException('Point not found');

    if (dto.name) {
      const existing = await this.pointRepo.findByName(dto.name);
      if (existing && existing.value.id !== id) {
        throw new BadRequestException('Point name already exists');
      }
      // point.name = dto.name;
      point.update({ name: dto.name });
    }

    if (dto.points_multiplier !== undefined) {
      // point.points_multiplier = dto.points_multiplier;
      point.update({ points_multiplier: dto.points_multiplier });
    }
    return this.pointRepo.save(point);
  }
}
