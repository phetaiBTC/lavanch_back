import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from '../../dto/login-Auth.dto';
import { GetByEmailUserUseCase } from 'src/modules/User/application/queries/getByEmail-User.usecase';
import { JwtService } from '@nestjs/jwt';
import { AuthPayload } from '../../interface/Auth.interface';

@Injectable()
export class LoginAuthUseCase {
  constructor(
    private readonly GetByEmailUserUseCase: GetByEmailUserUseCase,
    private readonly jwtService: JwtService,
  ) {}
  async execute(body: LoginDto): Promise<{ access_token: string }> {
    const user = await this.GetByEmailUserUseCase.execute(body.email);
    if (!user) throw new UnauthorizedException('invalid credentials');
    if (!(await user.compare(body.password)))
      throw new UnauthorizedException('invalid credentials');
    if (!user.value.is_verified)
      throw new UnauthorizedException('user not verified');
    const payload: AuthPayload = {
      id: user.value.id!,
      username: user.value.username,
      email: user.value.email,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
