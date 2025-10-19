import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  type IUserRepository,
  USER_REPOSITORY,
} from '../../domain/user.repository';
import { GetByEmailUserUseCase } from '../queries/getByEmail-User.usecase';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class VerifyUserUseCase {
  constructor(
    private readonly jwtService: JwtService,
    private readonly findByEmail: GetByEmailUserUseCase,
    @Inject(USER_REPOSITORY) private readonly userRepo: IUserRepository,
  ) {}
  async execute(token: string) {
    try {
      const email = await this.jwtService.verify(token).email;
      const user = await this.findByEmail.execute(email);
      if (!user) throw new NotFoundException('User not found');
      if (user.value.is_verified)
        throw new UnauthorizedException('User already verified');
      user.verify();
      return await this.userRepo.update(user);
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Token has expired');
      }
      throw new UnauthorizedException('Invalid token');
    }
  }
}
