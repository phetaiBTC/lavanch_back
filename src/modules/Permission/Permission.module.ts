import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionOrm } from 'src/database/typeorm/permission.orm-entity';
import { PermissionController } from './Permission.controller';
import { GetPermissionUseCase } from './application/queries/get-Permission.usecase';
import { Permission_REPOSITORY } from './domain/Permission.repository';
import { PermissionRepositoryImpl } from './infrastructure/Permission.repository.impl';
import { GetOnePermissionUseCase } from './application/queries/getOne-Permission.usecase';
@Module({
  imports: [TypeOrmModule.forFeature([PermissionOrm])],
  controllers: [PermissionController],
  providers: [
    {
      provide: Permission_REPOSITORY,
      useClass: PermissionRepositoryImpl,
    },
    GetPermissionUseCase,
    GetOnePermissionUseCase
  ],
  exports: [GetOnePermissionUseCase],
})
export class PermissionModule {}
