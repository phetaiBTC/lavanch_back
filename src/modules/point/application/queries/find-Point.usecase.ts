import { Inject, Injectable } from '@nestjs/common';
import {
  POINT_REPOSITORY,
  type IPointRepository,
} from '../../domain/point.repository';
import { Point } from '../../domain/point.entity';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
@Injectable()
export class FindAllPointUseCase {
  constructor(
    @Inject(POINT_REPOSITORY) private readonly pointRepo: IPointRepository,
  ) {}
  async execute(query: PaginationDto): Promise<PaginatedResponse<Point>> {
    return await this.pointRepo.findAll(query);
  }
}
