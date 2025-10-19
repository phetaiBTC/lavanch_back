import {
  BadRequestException,
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
import { ResetPasswordDto } from '../../dto/resetPassword-User.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../domain/user.entity';
@Injectable()
export class ResetPasswordUserUseCase {
  constructor(
    private readonly findByEmail: GetByEmailUserUseCase,
    @Inject(USER_REPOSITORY) private readonly userRepo: IUserRepository,
    private readonly jwtService: JwtService,
  ) {}
  async execute(dto: ResetPasswordDto, token: string): Promise<User> {
    try {
      if (dto.password != dto.confirm_password)
        throw new BadRequestException('Passwords do not match');
      const email = await this.jwtService.verify(token).email;
      const user = await this.findByEmail.execute(email);
      if (!user) throw new NotFoundException('User not found');
      await user.changePassword(dto.password);
      return this.userRepo.update(user);
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Token has expired');
      }
      throw new UnauthorizedException('Invalid token');
    }
  }
}
