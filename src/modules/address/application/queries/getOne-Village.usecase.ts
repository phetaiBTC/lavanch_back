import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  ADDRESS_REPOSITORY,
  type IAddressRepository,
} from '../../domain/address.repository';
import { Village } from '../../domain/address.entity';
@Injectable()
export class GetOneVillageUseCase {
  constructor(
    @Inject(ADDRESS_REPOSITORY)
    private readonly addressRepo: IAddressRepository,
  ) {}

  async execute(id: number): Promise<Village> {
    const entity = await this.addressRepo.getOneVillageUseCase(id);
    if (!entity) throw new NotFoundException('Village not found');
    return entity;
  }
}
