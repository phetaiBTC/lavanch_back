import { Inject, Injectable } from '@nestjs/common';
import {
  User_REPOSITORY,
  type IUserRepository,
} from '../../domain/User.repository';
import { User } from '../../domain/User.entity';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
@Injectable()
export class GetUserUseCase {
  constructor(
    @Inject(User_REPOSITORY) private readonly userRepo: IUserRepository,
  ) {}

  async execute(query: PaginationDto): Promise<PaginatedResponse<User>> {
    return await this.userRepo.findAll(query);
  }
}
