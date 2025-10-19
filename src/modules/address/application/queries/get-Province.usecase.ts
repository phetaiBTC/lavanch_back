import { Inject, Injectable } from '@nestjs/common';
import {
  Address_REPOSITORY,
  type IAddressRepository,
} from '../../domain/Address.repository';
import { Province } from '../../domain/address.entity';
@Injectable()
export class GetProvinceUseCase {
  constructor(
    @Inject(Address_REPOSITORY)
    private readonly addressRepo: IAddressRepository,
  ) {}

  async execute(): Promise<Province[]> {
    return await this.addressRepo.getProvince();
  }
}
