import {
  Body,
  Controller,
  Param,
  Patch,
  Query,
  Post,
  Get,
  Delete,
} from '@nestjs/common';
import { User } from './domain/user.entity';
import { UserOrm } from 'src/database/typeorm/user.orm-entity';
import { UserResponse } from './interface/user.interface';
import { CreateUserDto } from './dto/create-User.dto';
import { UpdateUserDto } from './dto/update-User.dto';
import { UserMapper } from './infrastructure/user.mapper';
import { CreateUserUseCase } from './application/commands/create-User.usecase';
import { UpdateUserUseCase } from './application/commands/update-User.usecase';
import { GetOneUserUseCase } from './application/queries/getOne-User.usecase';
import { GetUserUseCase } from './application/queries/get-User.usecase';
import { HardDeleteUserUseCase } from './application/commands/hard-User.usecase';
import { SoftDeleteUserUseCase } from './application/commands/soft-User.usecase';
import { RestoreUserUseCase } from './application/commands/restore-User.usecase';
import { BaseController } from 'src/shared/BaseModule/BaseController';
import { ChangePasswordUserUseCase } from './application/commands/changePassword-User.usecase';
import { ChangePasswordDto } from './dto/changePassword-User.dto';
import { CurrentUser } from 'src/shared/decorator/user.decorator';
import { type AuthPayload } from '../auth/interface/auth.interface';
import { VerifyUserUseCase } from './application/commands/verify-User.usecase';
import { ResetPasswordUserUseCase } from './application/commands/resetPassword-User.usecase';
import { ResetPasswordDto } from './dto/resetPassword-User.dto';
import { SendEmailDto } from './dto/sendEmail-User.dto';
import { sendEmailUserUseCase } from './application/commands/sendEmail-User.usecase';
import { Public } from 'src/shared/decorator/auth.decorator';
import { BaseControllerSetup } from 'src/shared/BaseModule/base.controller';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';

@Controller('user')
export class UserController extends BaseControllerSetup<
  User,
  UserOrm,
  UserResponse,
  CreateUserDto,
  UpdateUserDto
> {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    getOneUserUseCase: GetOneUserUseCase,
    private readonly getUserUseCase: GetUserUseCase,
    hardDeleteUserUseCase: HardDeleteUserUseCase,
    softDeleteUserUseCase: SoftDeleteUserUseCase,
    restoreUserUseCase: RestoreUserUseCase,
    private readonly changePasswordUseCase: ChangePasswordUserUseCase,
    private readonly verifyUserUseCase: VerifyUserUseCase,
    private readonly resetPasswordUseCase: ResetPasswordUserUseCase,
    private readonly sendEmailUserUseCase: sendEmailUserUseCase,
  ) {
    super({
      mapper: UserMapper,
      findOne: getOneUserUseCase,
      hardDelete: hardDeleteUserUseCase,
      softDelete: softDeleteUserUseCase,
      restore: restoreUserUseCase,
    });
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

  @Post('')
  async create(@Body() body: CreateUserDto): Promise<UserResponse> {
    return UserMapper.toResponse(await this.createUserUseCase.execute(body));
  }

  @Get('')
  async findAll(
    @Query()
    query: PaginationDto,
  ): Promise<PaginatedResponse<UserResponse>> {
    return UserMapper.toResponseList(await this.getUserUseCase.execute(query));
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateUserDto,
  ): Promise<UserResponse> {
    return UserMapper.toResponse(await this.updateUserUseCase.execute(id, dto));
  }
  @Public()
  @Patch('verify-email')
  async verifyEmail(@Query('token') token: string): Promise<UserResponse> {
    return UserMapper.toResponse(await this.verifyUserUseCase.execute(token));
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
  @Post('resend-mail-verify')
  async resendMail(@Body() body: SendEmailDto): Promise<{ message: string }> {
    return this.sendEmailUserUseCase.create(body.email);
  }

  @Public()
  @Post('send-password')
  async sendPassword(@Body() body: SendEmailDto): Promise<{ message: string }> {
    return this.sendEmailUserUseCase.reset(body.email);
  }
}
