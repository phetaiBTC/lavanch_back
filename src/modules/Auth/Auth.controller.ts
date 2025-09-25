import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { LoginDto } from './dto/login-Auth.dto';
import { LoginAuthUseCase } from './application/queries/login-Auth.usecase';
import { Public } from 'src/shared/decorator/auth.decorator';
import { CurrentUser } from 'src/shared/decorator/user.decorator';
import { type AuthPayload } from './interface/Auth.interface';
import { GetOneUserUseCase } from '../User/application/queries/getOne-User.usecase';
import { UserResponse } from '../User/interface/User.interface';
import { UserMapper } from '../User/infrastructure/User.mapper';

@Controller('auth'.toLowerCase())
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginAuthUseCase,
    private readonly findOneUser: GetOneUserUseCase,
  ) {}

  @Public()
  @Post('login')
  login(@Body() body: LoginDto): Promise<{ access_token: string }> {
    return this.loginUseCase.execute(body);
  }

  @Get('profile')
  async profile(@CurrentUser() user: AuthPayload): Promise<UserResponse> {
    return UserMapper.toResponse(await this.findOneUser.execute(user.id));
  }
}
