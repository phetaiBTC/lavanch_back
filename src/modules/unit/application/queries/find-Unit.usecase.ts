import { Inject, Injectable } from '@nestjs/common';
import {
  UNIT_REPOSITORY,
  type IUnitRepository,
} from '../../domain/unit.repository';
import { Unit } from '../../domain/unit.entity';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
@Injectable()
export class FindAllUnitUseCase {
  constructor(
    @Inject(UNIT_REPOSITORY) private readonly unitRepo: IUnitRepository,
  ) {}
  async execute(query: PaginationDto): Promise<PaginatedResponse<Unit>> {
    return await this.unitRepo.findAll(query);
  }
}
