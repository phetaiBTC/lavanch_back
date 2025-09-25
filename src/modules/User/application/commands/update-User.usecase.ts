import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  User_REPOSITORY,
  type IUserRepository,
} from '../../domain/User.repository';
import { User } from '../../domain/User.entity';
import { UpdateUserDto } from '../../dto/update-User.dto';
@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject(User_REPOSITORY) private readonly userRepo: IUserRepository,
  ) {}
  async execute(id: number, dto: UpdateUserDto): Promise<User> {
    const user = await this.userRepo.findById(id);
    if (!user) throw new NotFoundException('User not found');
    if (dto.username) user.changeUsername(dto.username);
    return this.userRepo.update(user);
  }
}
