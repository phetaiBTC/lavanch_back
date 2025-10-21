import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  POINT_REPOSITORY,
  type IPointRepository,
} from '../../domain/point.repository';
@Injectable()
export class HardDeletePointUseCase {
  constructor(
    @Inject(POINT_REPOSITORY) private readonly pointRepo: IPointRepository,
  ) {}
  async execute(id: number): Promise<{ message: string }> {
    const point = await this.pointRepo.findById(id);
    if (!point) throw new NotFoundException('Point not found');
    return this.pointRepo.hardDelete(id);
  }
}
