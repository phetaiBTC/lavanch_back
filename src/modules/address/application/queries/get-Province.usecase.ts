import { Inject, Injectable } from '@nestjs/common';
import {
  ADDRESS_REPOSITORY,
  type IAddressRepository,
} from '../../domain/address.repository';
import { Province } from '../../domain/address.entity';
@Injectable()
export class GetProvinceUseCase {
  constructor(
    @Inject(ADDRESS_REPOSITORY)
    private readonly addressRepo: IAddressRepository,
  ) {}

  async execute(): Promise<Province[]> {
    return await this.addressRepo.getProvince();
  }
}
