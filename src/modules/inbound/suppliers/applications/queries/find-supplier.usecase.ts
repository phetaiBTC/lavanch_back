import { Inject, Injectable } from '@nestjs/common';
import {
  SUPPLIER_REPOSITORY,
  type ISupplierRepository,
} from '../../domain/supplier.repository';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
import { SupplierResponse } from '../../interface/suppliers.interface';
@Injectable()
export class FindAllSupplierUseCase {
  constructor(
    @Inject(SUPPLIER_REPOSITORY)
    private readonly repo: ISupplierRepository,
  ) {}
  async execute(query: PaginationDto): Promise<PaginatedResponse<SupplierResponse>> {
    return await this.repo.findAll(query);
  }
}
