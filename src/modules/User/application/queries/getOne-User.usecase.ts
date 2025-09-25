import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  User_REPOSITORY,
  type IUserRepository,
} from '../../domain/User.repository';
import { User } from '../../domain/User.entity';
@Injectable()
export class GetOneUserUseCase {
  constructor(
    @Inject(User_REPOSITORY) private readonly userRepo: IUserRepository,
  ) {}

  async execute(id:number): Promise<User> {
    const user = await this.userRepo.findById(id);
    if (!user) throw new NotFoundException('User not found');
    return user
  }
}
