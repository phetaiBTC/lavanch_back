import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  SUPPLIERS_REPOSITORY,
  type ISuppliersRepository,
} from '../../domain/suppliers.repository';

import { UpdateSuppliersDto } from '../../dto/update-Suppliers.dto';
import { Suppliers } from '../../domain/suppliers.entity';
import { FindOneSuppliersUseCase } from '../queries/findOne-Suppliers.usecase';
@Injectable()
export class UpdateSuppliersUseCase {
  constructor(
    @Inject(SUPPLIERS_REPOSITORY)
    private readonly suppliersRepo: ISuppliersRepository,
    private readonly usecaseFindOne: FindOneSuppliersUseCase,
  ) {}

  async execute(id: number, dto: UpdateSuppliersDto): Promise<Suppliers> {
    const entity = await this.usecaseFindOne.execute(id);
    const updated = entity.update(dto);
    return this.suppliersRepo.save(updated);
  }
}
