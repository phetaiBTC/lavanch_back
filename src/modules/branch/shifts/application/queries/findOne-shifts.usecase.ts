import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import {
  SHIFTS_REPOSITORY,
  type IShiftsRepository,
} from '../../domain/shifts.repository';
import { Shifts } from '../../domain/shifts.entity';

@Injectable()
export class FindOneShiftsUseCase {
  constructor(
    @Inject(SHIFTS_REPOSITORY)
    private readonly shiftsRepo: IShiftsRepository,
  ) {}

  async execute(id: number): Promise<Shifts> {
    const shifts = await this.shiftsRepo.findById(id);
    if (!shifts) throw new NotFoundException('Shifts not found');
    return shifts;
  }
}
