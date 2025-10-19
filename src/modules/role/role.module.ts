import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleOrm } from 'src/database/typeorm/role.orm-entity';
import { RoleController } from './role.controller';
import { RoleRepositoryImpl } from './infrastructure/role.repository.impl';
import { ROLE_REPOSITORY } from './domain/role.repository';
import { GetRoleUseCase } from './application/queries/get-Role.usecase';
import { PermissionModule } from '../permission/permission.module';
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
      provide: ROLE_REPOSITORY,
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
