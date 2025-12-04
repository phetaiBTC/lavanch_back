import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  USER_REPOSITORY,
  type IUserRepository,
} from '../../domain/user.repository';
import { User } from '../../domain/user.entity';
@Injectable()
export class GetByEmailUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepo: IUserRepository,
  ) {}

  async execute(email: string): Promise<User> {
    const user = await this.userRepo.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
