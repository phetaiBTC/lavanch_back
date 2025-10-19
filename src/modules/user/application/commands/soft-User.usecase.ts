import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  USER_REPOSITORY,
  type IUserRepository,
} from '../../domain/user.repository';

@Injectable()
export class SoftDeleteUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepo: IUserRepository,
  ) {}

  async execute(id: number): Promise<{ message: string }> {
    const user = await this.userRepo.findById(id);
    if (!user) throw new NotFoundException('User not found');
    return await this.userRepo.softDelete(id);
  }
}
