import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionOrm } from 'src/database/typeorm/permission.orm-entity';
import { PermissionController } from './permission.controller';
import { GetPermissionUseCase } from './application/queries/get-Permission.usecase';
import { PERMISSION_REPOSITORY } from './domain/permission.repository';
import { PermissionRepositoryImpl } from './infrastructure/permission.repository.impl';
import { GetOnePermissionUseCase } from './application/queries/getOne-Permission.usecase';
@Module({
  imports: [TypeOrmModule.forFeature([PermissionOrm])],
  controllers: [PermissionController],
  providers: [
    {
      provide: PERMISSION_REPOSITORY,
      useClass: PermissionRepositoryImpl,
    },
    GetPermissionUseCase,
    GetOnePermissionUseCase
  ],
  exports: [GetOnePermissionUseCase],
})
export class PermissionModule {}
