import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from '../../dto/login-Auth.dto';
import { GetByEmailUserUseCase } from 'src/modules/user/application/queries/getByEmail-User.usecase';
import { JwtService } from '@nestjs/jwt';
import { AuthPayload } from '../../interface/auth.interface';

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
    const permissions = user.value.permissions.map((permission) => {
      return permission.value.code;
    });
    user.value.roles.forEach((role) => {
      role.value.permissions.forEach((permission) => {
        permissions.push(permission.value.code);
      });
    });
    const payload: AuthPayload = {
      id: user.value.id!,
      username: user.value.username,
      email: user.value.email,
      roles: user.value.roles.map((role) => role.value.code),
      permissions,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  } 
}
