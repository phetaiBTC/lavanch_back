import { Inject, Injectable } from '@nestjs/common';
import {
  type ISupplierRepository,
  SUPPLIER_REPOSITORY,
} from '../../domain/supplier.repository';
import { Supplier } from '../../domain/supplier.entity';
import { UpdateSupplierDto } from '../../dto/update-supplier.dto';
import { LoadSupplierUseCase } from '../queries/load-supplier.usecase';

@Injectable()
export class UpdateSupplierUseCase {
  constructor(
    @Inject(SUPPLIER_REPOSITORY)
    private readonly supplierRepo: ISupplierRepository,
    private readonly loadSupplier: LoadSupplierUseCase,
  ) {}

  async execute(
    id: number,
    dto: UpdateSupplierDto,
  ): Promise<{ message: string }> {
    const domain = await this.loadSupplier.execute(id);
    domain.update(dto);
    await this.supplierRepo.save(domain);
    return { message: 'Supplier updated successfully' };
  }
}
