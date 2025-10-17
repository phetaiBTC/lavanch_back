import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleOrm } from 'src/database/typeorm/role.orm-entity';
import { RoleController } from './Role.controller';
import { RoleRepositoryImpl } from './infrastructure/Permission.repository.impl';
import { Role_REPOSITORY } from './domain/Role.repository';
import { GetRoleUseCase } from './application/queries/get-Role.usecase';
import { PermissionModule } from '../Permission/Permission.module';
import { CreateRoleUseCase } from './application/commands/create-Role.usecase';
import { GetOneRoleUseCase } from './application/queries/getOne-Role.usecase';
import { UpdateRoleUseCase } from './application/commands/udate-Role.usecase';
import { SoftDeleteRoleUseCase } from './application/commands/soft-Role.usecase';
import { HardDeleteRoleUseCase } from './application/commands/hard-Role.usecase';
import { RestoreRoleUseCase } from './application/commands/restore-Role.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([RoleOrm]), PermissionModule],
  controllers: [RoleController],
  providers: [
    {
      provide: Role_REPOSITORY,
      useClass: RoleRepositoryImpl,
    },
    GetRoleUseCase,
    CreateRoleUseCase,
    GetOneRoleUseCase,
    UpdateRoleUseCase,
    SoftDeleteRoleUseCase,
    HardDeleteRoleUseCase,
    RestoreRoleUseCase,
  ],
  exports: [],
})
export class RoleModule {}
