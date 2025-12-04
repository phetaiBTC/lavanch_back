import { Injectable, Inject } from '@nestjs/common';
import {
  SHIFTS_REPOSITORY,
  type IShiftsRepository,
} from '../../domain/shifts.repository';

@Injectable()
export class SoftDeleteShiftsUseCase {
  constructor(
    @Inject(SHIFTS_REPOSITORY)
    private readonly shiftsRepo: IShiftsRepository,
  ) {}

  async execute(id: number): Promise<{ message: string }> {
    return this.shiftsRepo.softDelete(id);
  }
}
