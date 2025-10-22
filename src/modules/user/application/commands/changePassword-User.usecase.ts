import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ChangePasswordDto } from '../../dto/changePassword-User.dto';
import { GetOneUserUseCase } from 'src/modules/user/application/queries/getOne-User.usecase';
import {
  type IUserRepository,
  USER_REPOSITORY,
} from '../../domain/user.repository';
@Injectable()
export class ChangePasswordUserUseCase {
  constructor(
    private readonly findOneUser: GetOneUserUseCase,
    @Inject(USER_REPOSITORY) private readonly userRepo: IUserRepository,
  ) {}
  async execute(id: number, dto: ChangePasswordDto) {
    const user = await this.findOneUser.execute(id);
    if (!user) throw new NotFoundException('User not found');
    if (!(await user.compare(dto.oldPassword)))
      throw new UnauthorizedException('invalid credentials');
    await user.changePassword(dto.newPassword);
    return this.userRepo.save(user);
  }
}
