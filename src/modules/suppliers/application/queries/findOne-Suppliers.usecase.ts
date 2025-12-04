import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { SUPPLIERS_REPOSITORY, type ISuppliersRepository } from '../../domain/suppliers.repository';
import { Suppliers } from '../../domain/suppliers.entity';
@Injectable()
export class FindOneSuppliersUseCase {
  constructor(
    @Inject(SUPPLIERS_REPOSITORY)
    private readonly suppliersRepo: ISuppliersRepository,
  ) {}

  async execute(id: number): Promise<Suppliers> {
    const entity = await this.suppliersRepo.findById(id);
    if (!entity) throw new NotFoundException('Suppliers not found');
    return entity;
  }
}
