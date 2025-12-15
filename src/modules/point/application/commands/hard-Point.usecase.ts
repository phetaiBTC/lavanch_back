import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  POINT_REPOSITORY,
  type IPointRepository,
} from '../../domain/point.repository';
import { FindOnePointUseCase } from '../queries/findOne-Point.usecase';
@Injectable()
export class HardDeletePointUseCase {
  constructor(
    @Inject(POINT_REPOSITORY) private readonly pointRepo: IPointRepository,

    private readonly usecaseFIndOnePoint: FindOnePointUseCase,
  ) {}
  async execute(id: number[]): Promise<{ message: string }> {
    await Promise.all(id.map((id) => this.usecaseFIndOnePoint.execute(id)));
    return this.pointRepo.hardDelete(id);
  }
}
