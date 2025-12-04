import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import {
  SUPPLIERS_REPOSITORY,
  type ISuppliersRepository,
} from '../../domain/suppliers.repository';

import { CreateSuppliersDto } from '../../dto/create-Suppliers.dto';
import { Suppliers } from '../../domain/suppliers.entity';
import { GetOneVillageUseCase } from 'src/modules/address/application/queries/getOne-Village.usecase';
@Injectable()
export class CreateSuppliersUseCase {
  constructor(
    @Inject(SUPPLIERS_REPOSITORY)
    private readonly suppliersRepo: ISuppliersRepository,
    private readonly getOneVillageUseCase: GetOneVillageUseCase,
  ) {}

  async execute(dto: CreateSuppliersDto): Promise<Suppliers> {
    const village = dto.village_id
      ? await this.getOneVillageUseCase.execute(dto.village_id)
      : undefined;

    const supplier = new Suppliers({ ...dto, village });
    return this.suppliersRepo.save(supplier);
  }
}
