import { Inject, Injectable } from '@nestjs/common';
import {
  Address_REPOSITORY,
  type IAddressRepository,
} from '../../domain/Address.repository';
import { Village } from '../../domain/address.entity';
@Injectable()
export class GetVillageUseCase {
  constructor(
    @Inject(Address_REPOSITORY)
    private readonly addressRepo: IAddressRepository,
  ) {}

  async execute(districtId: number): Promise<Village[]> {
    return await this.addressRepo.getVillage(districtId);
  }
}
