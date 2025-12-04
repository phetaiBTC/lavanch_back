import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import {
  UNIT_REPOSITORY,
  type IUnitRepository,
} from '../../domain/unit.repository';
import { Unit } from '../../domain/unit.entity';
import { CreateUnitDto } from '../../dto/create-Unit.dto';

@Injectable()
export class CreateUnitUseCase {
  constructor(
    @Inject(UNIT_REPOSITORY)
    private readonly unitRepo: IUnitRepository,
  ) {}

  async execute(dto: CreateUnitDto): Promise<Unit> {
    const exists = await this.unitRepo.findByName(dto.name);
    if (exists) {
      throw new BadRequestException('Unit already exists');
    }

    const unit = new Unit({
      name: dto.name,
      name_en: dto.name_en,
      abbreviation: dto.abbreviation,
      is_active: dto.is_active ?? true,
    });

    return this.unitRepo.save(unit);
  }
}
