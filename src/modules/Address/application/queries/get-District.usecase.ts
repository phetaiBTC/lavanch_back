import { Inject, Injectable } from '@nestjs/common';
import {
  Address_REPOSITORY,
  type IAddressRepository,
} from '../../domain/Address.repository';
import { District } from '../../domain/Address.entity';
@Injectable()
export class GetDistrictUseCase {
  constructor(
    @Inject(Address_REPOSITORY)
    private readonly addressRepo: IAddressRepository,
  ) {}

  async execute(provinceId: number): Promise<District[]> {
    return await this.addressRepo.getDistrict(provinceId);
  }
}
