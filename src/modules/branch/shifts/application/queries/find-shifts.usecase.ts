import { Injectable, Inject } from '@nestjs/common';
import {
  SHIFTS_REPOSITORY,
  type IShiftsRepository,
} from '../../domain/shifts.repository';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
import { Shifts } from '../../domain/shifts.entity';

@Injectable()
export class FindAllShiftsUseCase {
  constructor(
    @Inject(SHIFTS_REPOSITORY)
    private readonly shiftsRepo: IShiftsRepository,
  ) {}

  async execute(query: PaginationDto): Promise<PaginatedResponse<Shifts>> {
    return this.shiftsRepo.findAll(query);
  }
}
