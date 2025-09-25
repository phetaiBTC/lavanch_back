import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  User_REPOSITORY,
  type IUserRepository,
} from '../../domain/User.repository';
import { User } from '../../domain/User.entity';
@Injectable()
export class GetByEmailUserUseCase {
  constructor(
    @Inject(User_REPOSITORY) private readonly userRepo: IUserRepository,
  ) {}

  async execute(email:string): Promise<User> {
    const user = await this.userRepo.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
