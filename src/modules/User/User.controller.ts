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
import { UserResponse } from './interface/User.interface';
import { UserMapper } from './infrastructure/User.mapper';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
import { SoftDeleteUserUseCase } from './application/commands/soft-User.usecase';
import { UpdateUserUseCase } from './application/commands/update-User.usecase';
import { UpdateUserDto } from './dto/update-User.dto';
import { GetOneUserUseCase } from './application/queries/getOne-User.usecase';
import { CurrentUser } from 'src/shared/decorator/user.decorator';
import { ChangePasswordDto } from './dto/changePassword-User.dto';
import { type AuthPayload } from '../Auth/interface/Auth.interface';
import { ChangePasswordUserUseCase } from './application/commands/changePassword-User.usecase';
import { VerifyUserUseCase } from './application/commands/verify-User.usecase';
import { Public } from 'src/shared/decorator/auth.decorator';

@Controller('user'.toLowerCase())
export class UserController {
  constructor(
    private readonly createUser: CreateUserUseCase,
    private readonly findAllUser: GetUserUseCase,
    private readonly softDeleteUser: SoftDeleteUserUseCase,
    private readonly updateUser: UpdateUserUseCase,
    private readonly findOneUser: GetOneUserUseCase,
    private readonly changePasswordUseCase: ChangePasswordUserUseCase,
    private readonly verifyUserUseCase: VerifyUserUseCase,
  ) {}
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
  @Patch('verify-email')
  async verifyEmail(@Query('token') token: string): Promise<UserResponse> {
    return UserMapper.toResponse(await this.verifyUserUseCase.execute(token));
  }
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateUserDto,
  ): Promise<UserResponse> {
    return UserMapper.toResponse(await this.updateUser.execute(id, dto));
  }

  // @Delete('hard/:id')
  // hardDelete(@Param('id') id: number) {
  //   return this.userService.hardDeleteUser(+id);
  // }

  @Delete('soft/:id')
  softDelete(@Param('id') id: number) {
    return this.softDeleteUser.execute(+id);
  }

  // @Patch('restore')
  // restore(@Param('id') id: number) {
  //   return this.userService.restoreUser(+id);
  // }
}
