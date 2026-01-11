import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  SUPPLIER_REPOSITORY,
  type ISupplierRepository,
} from '../../domain/supplier.repository';
import { SupplierResponse } from '../../interface/suppliers.interface';

@Injectable()
export class FindOneSupplierUseCase {
  constructor(
    @Inject(SUPPLIER_REPOSITORY)
    private readonly repo: ISupplierRepository,
  ) {}
  async execute(id: number): Promise<SupplierResponse> {
    const supplier = await this.repo.findById(id);
    if (!supplier) throw new NotFoundException('Supplier not found');
    return supplier;
  }
}
