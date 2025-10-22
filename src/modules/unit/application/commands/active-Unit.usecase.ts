import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  UNIT_REPOSITORY,
  type IUnitRepository,
} from '../../domain/unit.repository';
import { Unit } from '../../domain/unit.entity';
import { ActiveUnitDto } from '../../dto/active-Unit.dto';

@Injectable()
export class ActiveUnitUseCase {
  constructor(
    @Inject(UNIT_REPOSITORY)
    private readonly unitRepo: IUnitRepository,
  ) {}

  async execute(id: number, dto: ActiveUnitDto): Promise<Unit> {
    const existing = await this.unitRepo.findById(id);
    if (!existing) {
      throw new NotFoundException('Unit not found');
    }
    const updatedUnit = new Unit({
      ...existing.value,
      is_active: dto.is_active,
    });
    return this.unitRepo.save(updatedUnit);
  }
}
