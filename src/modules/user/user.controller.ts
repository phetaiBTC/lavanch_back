import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import { CreateUserUseCase } from './application/commands/create-User.usecase';
import { CreateUserDto } from './dto/create-User.dto';
import { GetUserUseCase } from './application/queries/get-User.usecase';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { UserResponse } from './interface/user.interface';
import { UserMapper } from './infrastructure/user.mapper';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
import { SoftDeleteUserUseCase } from './application/commands/soft-User.usecase';
import { UpdateUserUseCase } from './application/commands/update-User.usecase';
import { UpdateUserDto } from './dto/update-User.dto';
import { GetOneUserUseCase } from './application/queries/getOne-User.usecase';
import { CurrentUser } from 'src/shared/decorator/user.decorator';
import { ChangePasswordDto } from './dto/changePassword-User.dto';
import { type AuthPayload } from '../auth/interface/auth.interface';
import { ChangePasswordUserUseCase } from './application/commands/changePassword-User.usecase';
import { VerifyUserUseCase } from './application/commands/verify-User.usecase';
import { Public } from 'src/shared/decorator/auth.decorator';
import { ResetPasswordUserUseCase } from './application/commands/resetPassword-User.usecase';
import { ResetPasswordDto } from './dto/resetPassword-User.dto';
import { SendEmailDto } from './dto/sendEmail-User.dto';
import { sendEmailUserUseCase } from './application/commands/sendEmail-User.usecase';
import { HardDeleteUserUseCase } from './application/commands/hard-User.usecase';
import { RestoreUserUseCase } from './application/commands/restore-User.usecase';

@Controller('user')
export class UserController {
  constructor(
    private readonly createUser: CreateUserUseCase,
    private readonly findAllUser: GetUserUseCase,
    private readonly softDeleteUser: SoftDeleteUserUseCase,
    private readonly hardDeleteUser: HardDeleteUserUseCase,
    private readonly restoreUser: RestoreUserUseCase,

    private readonly updateUser: UpdateUserUseCase,
    private readonly findOneUser: GetOneUserUseCase,
    private readonly changePasswordUseCase: ChangePasswordUserUseCase,
    private readonly verifyUserUseCase: VerifyUserUseCase,
    private readonly resetPasswordUseCase: ResetPasswordUserUseCase,
    private readonly sendEmailUserUseCase: sendEmailUserUseCase,
  ) {}
  @Public()
  @Post()
  async create(@Body() dto: CreateUserDto): Promise<UserResponse> {
    return UserMapper.toResponse(await this.createUser.execute(dto));
  }

  @Get()
  async findAll(
    @Query() query: PaginationDto,
  ): Promise<PaginatedResponse<UserResponse>> {
    return UserMapper.toResponseList(await this.findAllUser.execute(query));
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<UserResponse> {
    return UserMapper.toResponse(await this.findOneUser.execute(id));
  }
  @Patch('change-password')
  async changePassword(
    @Body() body: ChangePasswordDto,
    @CurrentUser() user: AuthPayload,
  ): Promise<UserResponse> {
    return UserMapper.toResponse(
      await this.changePasswordUseCase.execute(user.id, body),
    );
  }
  @Public()
  @Post('resend-mail-verify')
  async resendMail(@Body() body: SendEmailDto): Promise<{ message: string }> {
    return this.sendEmailUserUseCase.create(body.email);
  }
  @Public()
  @Patch('reset-password')
  async resetPassword(
    @Body() body: ResetPasswordDto,
    @Query('token') token: string,
  ): Promise<UserResponse> {
    return UserMapper.toResponse(
      await this.resetPasswordUseCase.execute(body, token),
    );
  }
  @Public()
  @Patch('verify-email')
  async verifyEmail(@Query('token') token: string): Promise<UserResponse> {
    return UserMapper.toResponse(await this.verifyUserUseCase.execute(token));
  }
  @Public()
  @Post('send-password')
  async sendPassword(@Body() body: SendEmailDto): Promise<{ message: string }> {
    return this.sendEmailUserUseCase.reset(body.email);
  }
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateUserDto,
  ): Promise<UserResponse> {
    return UserMapper.toResponse(await this.updateUser.execute(id, dto));
  }

  @Delete('soft/:id')
  async softDelete(@Param('id') id: number): Promise<{ message: string }> {
    return await this.softDeleteUser.execute(+id);
  }

  @Delete('hard/:id')
  async hardDelete(@Param('id') id: number): Promise<{ message: string }> {
    return await this.hardDeleteUser.execute(+id);
  }

  @Patch('restore')
  async restore(@Param('id') id: number): Promise<{ message: string }> {
    return await this.restoreUser.execute(+id);
  }
}
