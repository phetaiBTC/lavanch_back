import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  USER_REPOSITORY,
  type IUserRepository,
} from '../../domain/user.repository';
import { GetOneUserUseCase } from '../queries/getOne-User.usecase';

@Injectable()
export class HardDeleteUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepo: IUserRepository,
    private readonly getOneUser: GetOneUserUseCase,
  ) {}

  async execute(id: number[]): Promise<{ message: string }> {
    await Promise.all(id.map((id) => this.getOneUser.execute(id)));
    return await this.userRepo.hardDelete(id);
  }
}
