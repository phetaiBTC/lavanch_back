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
import { CreateUserDto } from '../user/dto/create-User.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginAuthUseCase,
    private readonly findOneUser: GetOneUserUseCase,
    private readonly createUserUseCase: CreateUserUseCase,
  ) {}

  @Public()
  @Post('login')
  login(@Body() body: LoginDto): Promise<{ access_token: string }> {
    return this.loginUseCase.execute(body);
  }

  @Public()
  @Post('register')
  async register(@Body() body: CreateUserDto): Promise<UserResponse> {
    return UserMapper.toResponse(await this.createUserUseCase.execute(body));
  }
  @Get('profile')
  async profile(@CurrentUser() user: AuthPayload): Promise<UserResponse> {
    return UserMapper.toResponse(await this.findOneUser.execute(user.id));
  }
}
