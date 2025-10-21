import { Injectable, Inject } from '@nestjs/common';
import {
  SHIFTS_REPOSITORY,
  type IShiftsRepository,
} from '../../domain/shifts.repository';
import { Shifts } from '../../domain/shifts.entity';
import { CreateShiftsDto } from '../../dto/create-shifts.dto';

@Injectable()
export class CreateShiftsUseCase {
  constructor(
    @Inject(SHIFTS_REPOSITORY)
    private readonly shiftsRepo: IShiftsRepository,
  ) {}

  async execute(dto: CreateShiftsDto): Promise<Shifts> {
    return this.shiftsRepo.create(new Shifts(dto));
  }
}
