import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { SUPPLIERS_REPOSITORY, type ISuppliersRepository } from '../../domain/suppliers.repository';
import { FindOneSuppliersUseCase } from '../queries/findOne-Suppliers.usecase';
@Injectable()
export class HardDeleteSuppliersUseCase {
  constructor(
    @Inject(SUPPLIERS_REPOSITORY)
    private readonly suppliersRepo: ISuppliersRepository,
    private readonly usecaseFindOne: FindOneSuppliersUseCase,
  ) {}

  async execute(id: number): Promise<{ message: string }> {
    await this.usecaseFindOne.execute(id);
    await this.suppliersRepo.hardDelete(id);
    return { message: 'Suppliers deleted successfully' };
  }
}
