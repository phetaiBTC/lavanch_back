import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  User_REPOSITORY,
  type IUserRepository,
} from '../../domain/User.repository';

@Injectable()
export class RestoreUserUseCase {
  constructor(
    @Inject(User_REPOSITORY) private readonly userRepo: IUserRepository,
  ) {}

  async execute(id: number): Promise<{ message: string }> {
    const user = await this.userRepo.findById(id);
    if (!user) throw new NotFoundException('User not found');
    return await this.userRepo.restore(id);
  }
}
