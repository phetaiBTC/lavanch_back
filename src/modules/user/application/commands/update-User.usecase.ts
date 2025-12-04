import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  USER_REPOSITORY,
  type IUserRepository,
} from '../../domain/user.repository';
import { User } from '../../domain/user.entity';
import { UpdateUserDto } from '../../dto/update-User.dto';
@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepo: IUserRepository,
  ) {}
  async execute(id: number, dto: UpdateUserDto): Promise<User> {
    const user = await this.userRepo.findById(id);
    if (!user) throw new NotFoundException('User not found');
    if (dto.username) user.changeUsername(dto.username);
    return this.userRepo.save(user);
  }
}
