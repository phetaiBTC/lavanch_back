import { Inject, Injectable } from '@nestjs/common';
import {
  type ISupplierRepository,
  SUPPLIER_REPOSITORY,
} from '../../domain/supplier.repository';
import { CreateSupplierDto } from '../../dto/create-supplier.dto';
import { Supplier } from '../../domain/supplier.entity';

@Injectable()
export class CreateSupplierUseCase {
  constructor(
    @Inject(SUPPLIER_REPOSITORY)
    private readonly repo: ISupplierRepository,
  ) {}

  async execute(dto: CreateSupplierDto): Promise<{ message: string }> {
    const domain = new Supplier(dto);
    // console.log(domain);
    await this.repo.save(domain);
    return { message: 'Supplier created successfully' };
  }
}
