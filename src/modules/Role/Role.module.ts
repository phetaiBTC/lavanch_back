import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleOrm } from 'src/database/typeorm/role.orm-entity';
import { RoleController } from './Role.controller';
import { RoleRepositoryImpl } from './infrastructure/Permission.repository.impl';
import { Role_REPOSITORY } from './domain/Role.repository';
import { GetRoleUseCase } from './application/queries/get-Role.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([RoleOrm])],
  controllers: [RoleController],
  providers: [
    {
      provide: Role_REPOSITORY,
      useClass: RoleRepositoryImpl,
    },
    GetRoleUseCase
  ],
  exports: [],
})
export class RoleModule {}
