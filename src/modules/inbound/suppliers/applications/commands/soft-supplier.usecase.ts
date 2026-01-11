import { Inject, Injectable } from '@nestjs/common';
import {
  SUPPLIER_REPOSITORY,
  type ISupplierRepository,
} from '../../domain/supplier.repository';
import { LoadSupplierUseCase } from '../queries/load-supplier.usecase';
@Injectable()
export class SoftDeleteSupplierUseCase {
  constructor(
    @Inject(SUPPLIER_REPOSITORY)
    private readonly repo: ISupplierRepository,
    private readonly loadSupplier: LoadSupplierUseCase,
  ) {}
  async execute(id: number[]): Promise<{ message: string }> {
    await Promise.all(id.map((id) => this.loadSupplier.execute(id)));
    await this.repo.softDelete(id);
    return {
      message: 'Supplier deleted successfully',
    };
  }
}
