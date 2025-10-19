import { Inject, Injectable } from '@nestjs/common';
import {
  ADDRESS_REPOSITORY,
  type IAddressRepository,
} from '../../domain/address.repository';
import { District } from '../../domain/address.entity';
@Injectable()
export class GetDistrictUseCase {
  constructor(
    @Inject(ADDRESS_REPOSITORY)
    private readonly addressRepo: IAddressRepository,
  ) {}

  async execute(provinceId: number): Promise<District[]> {
    return await this.addressRepo.getDistrict(provinceId);
  }
}
