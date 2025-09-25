import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepositoryImpl } from './infrastructure/User.repository.impl';
import { UserController } from './User.controller';
import { User_REPOSITORY } from './domain/User.repository';
import { UserOrm } from 'src/database/typeorm/user.orm-entity';
import { CreateUserUseCase } from './application/commands/create-User.usecase';
import { GetByEmailUserUseCase } from './application/queries/getByEmail-User.usecase';
import { SoftDeleteUserUseCase } from './application/commands/soft-User.usecase';
import { GetUserUseCase } from './application/queries/get-User.usecase';
import { UpdateUserUseCase } from './application/commands/update-User.usecase';
import { GetOneUserUseCase } from './application/queries/getOne-User.usecase';
import { ChangePasswordUserUseCase } from './application/commands/changePassword-User.usecase';
import { VerifyUserUseCase } from './application/commands/verify-User.usecase';

import { MailModule } from '../mail/mail.module';
@Module({
  imports: [TypeOrmModule.forFeature([UserOrm]),MailModule],
  controllers: [UserController],
  providers: [
    {
      provide: User_REPOSITORY,
      useClass: UserRepositoryImpl,
    },
    CreateUserUseCase,
    GetByEmailUserUseCase,
    GetUserUseCase,
    SoftDeleteUserUseCase,
    UpdateUserUseCase,
    GetOneUserUseCase,
    ChangePasswordUserUseCase,
    VerifyUserUseCase
  ],
  exports: [GetByEmailUserUseCase,GetOneUserUseCase,UpdateUserUseCase],
})
export class UserModule {}
