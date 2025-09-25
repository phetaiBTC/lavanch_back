import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  type IUserRepository,
  User_REPOSITORY,
} from '../../domain/User.repository';
import { GetByEmailUserUseCase } from '../queries/getByEmail-User.usecase';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class VerifyUserUseCase {
  constructor(
    private readonly jwtService: JwtService,
    private readonly findByEmail: GetByEmailUserUseCase,
    @Inject(User_REPOSITORY) private readonly userRepo: IUserRepository,
  ) {}
  async execute(token: string) {
    const email = await this.jwtService.verify(token).email;
    const user = await this.findByEmail.execute(email);
    if (!user) throw new NotFoundException('User not found');
    if (user.value.is_verified)
      throw new UnauthorizedException('User already verified');
    user.verify();
    return await this.userRepo.update(user);
  }
}
