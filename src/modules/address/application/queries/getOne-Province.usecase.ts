import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  ADDRESS_REPOSITORY,
  type IAddressRepository,
} from '../../domain/address.repository';
import { Province } from '../../domain/address.entity';
@Injectable()
export class GetProvinceOneUseCase {
  constructor(
    @Inject(ADDRESS_REPOSITORY)
    private readonly addressRepo: IAddressRepository,
  ) {}

  async execute(id: number): Promise<Province> {
    const entity = await this.addressRepo.getOneProvinceUseCase(id);
    if (!entity) throw new NotFoundException('Province not found');
    return entity;
  }
}
