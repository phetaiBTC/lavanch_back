import { Inject, Injectable } from '@nestjs/common';
import {
  ADDRESS_REPOSITORY,
  type IAddressRepository,
} from '../../domain/address.repository';
import { Village } from '../../domain/address.entity';
@Injectable()
export class GetVillageUseCase {
  constructor(
    @Inject(ADDRESS_REPOSITORY)
    private readonly addressRepo: IAddressRepository,
  ) {}

  async execute(districtId: number): Promise<Village[]> {
    return await this.addressRepo.getVillage(districtId);
  }
}
