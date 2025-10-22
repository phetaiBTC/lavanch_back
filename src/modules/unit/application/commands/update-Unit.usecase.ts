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
    const [unit, exists] = await Promise.all([
      this.unitRepo.findById(id),
      this.unitRepo.findByName(dto.name),
    ]);
    if (!unit) throw new NotFoundException('Unit not found');

    if (dto.name && dto.name !== unit.value.name && exists)
      throw new BadRequestException('Unit name already exists');

    unit.update(dto);

    return this.unitRepo.save(unit);
  }
}
