import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import {
  SHIFTS_REPOSITORY,
  type IShiftsRepository,
} from '../../domain/shifts.repository';
import { Shifts } from '../../domain/shifts.entity';
import { UpdateShiftsDto } from '../../dto/update-shifts.dto';

@Injectable()
export class UpdateShiftsUseCase {
  constructor(
    @Inject(SHIFTS_REPOSITORY)
    private readonly shiftsRepo: IShiftsRepository,
  ) {}

  async execute(id: number, dto: UpdateShiftsDto): Promise<Shifts> {
    const shifts = await this.shiftsRepo.findById(id);
    if (!shifts) throw new NotFoundException('Shifts not found');

    const updated = shifts.update(dto);
    return this.shiftsRepo.update(updated);
  }
}
