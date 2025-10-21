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
import { UpdateUnitDto } from '../../dto/update-Unit.dto';

@Injectable()
export class UpdateUnitUseCase {
  constructor(
    @Inject(UNIT_REPOSITORY)
    private readonly unitRepo: IUnitRepository,
  ) {}

  async execute(id: number, dto: UpdateUnitDto): Promise<Unit> {
    const existing = await this.unitRepo.findById(id);
    if (!existing) {
      throw new NotFoundException('Unit not found');
    }

    if (dto.name && dto.name !== existing.value.name) {
      const duplicate = await this.unitRepo.findByName(dto.name);
      if (duplicate) {
        throw new BadRequestException('Unit name already exists');
      }
    }

    const updatedUnit = new Unit({
      ...existing.value,
      name: dto.name ?? existing.value.name,
      name_en: dto.name_en ?? existing.value.name_en,
      abbreviation: dto.abbreviation ?? existing.value.abbreviation,
    });

    return this.unitRepo.update(updatedUnit);
  }
}
