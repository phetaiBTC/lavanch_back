import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  SUPPLIER_REPOSITORY,
  type ISupplierRepository,
} from '../../domain/supplier.repository';
import { Supplier } from '../../domain/supplier.entity';
@Injectable()
export class LoadSupplierUseCase {
  constructor(
    @Inject(SUPPLIER_REPOSITORY)
    private readonly repo: ISupplierRepository,
  ) {}
  async execute(id: number): Promise<Supplier> {
    const supplier = await this.repo.load(id);
    // console.log(supplier);
    if (!supplier) throw new NotFoundException('Supplier not found');
    return supplier;
  }
}
