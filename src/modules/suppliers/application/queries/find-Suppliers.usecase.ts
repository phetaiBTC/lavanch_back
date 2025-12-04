import { Inject, Injectable } from '@nestjs/common';
import { SUPPLIERS_REPOSITORY, type ISuppliersRepository } from '../../domain/suppliers.repository';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
import { Suppliers } from '../../domain/suppliers.entity';

@Injectable()
export class FindAllSuppliersUseCase {
  constructor(
    @Inject(SUPPLIERS_REPOSITORY)
    private readonly suppliersRepo: ISuppliersRepository,
  ) {}

  async execute(query: PaginationDto): Promise<PaginatedResponse<Suppliers>> {
    return this.suppliersRepo.findAll(query);
  }
}
