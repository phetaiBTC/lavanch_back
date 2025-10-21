import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  UNIT_REPOSITORY,
  type IUnitRepository,
} from '../../domain/unit.repository';
import { Unit } from '../../domain/unit.entity';
import { CreateUnitDto } from '../../dto/create-Unit.dto';
@Injectable()
export class SoftDeleteUnitUseCase {
  constructor(
    @Inject(UNIT_REPOSITORY) private readonly unitRepo: IUnitRepository,
  ) {}
  async execute(id: number): Promise<{ message: string }> {
    const unit = await this.unitRepo.findById(id);
    if (!unit) throw new NotFoundException('Unit not found');
    return this.unitRepo.softDelete(id);
  }
}
