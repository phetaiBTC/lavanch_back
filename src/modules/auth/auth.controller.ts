import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { LoginDto } from './dto/login-Auth.dto';
import { LoginAuthUseCase } from './application/queries/login-Auth.usecase';
import { Public } from 'src/shared/decorator/auth.decorator';
import { CurrentUser } from 'src/shared/decorator/user.decorator';
import { type AuthPayload } from './interface/auth.interface';
import { GetOneUserUseCase } from '../user/application/queries/getOne-User.usecase';
import { UserResponse } from '../user/interface/user.interface';
import { UserMapper } from '../user/infrastructure/user.mapper';
import { CreateUserUseCase } from '../user/application/commands/create-User.usecase';
// import { CreateUserDto } from '../user/dto/create-User.dto';
import { RegisterUserDto } from './dto/register-Auth.dto';
import { RegisterUserUseCase } from './application/command/register-Auth.usecase';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginAuthUseCase,
    private readonly findOneUser: GetOneUserUseCase,
    private readonly registerUserUseCase: RegisterUserUseCase,
  ) {}

  @Public()
  @Post('login')
  login(@Body() body: LoginDto): Promise<{ access_token: string }> {
    return this.loginUseCase.execute(body);
  }

  @Public()
  @Post('register')
  async register(@Body() body: RegisterUserDto): Promise<UserResponse> {
    return UserMapper.toResponse(await this.registerUserUseCase.execute(body));
  }
  @Get('profile')
  async profile(@CurrentUser() user: AuthPayload): Promise<UserResponse> {
    return UserMapper.toResponse(await this.findOneUser.execute(user.id));
  }
}
