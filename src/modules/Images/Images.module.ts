import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagesOrm } from 'src/database/typeorm/image.orm-entity';
import { FileModule } from '../File/file.module';
import { ImagesController } from './Images.controller';
import { ImagesRepositoryImpl } from './infrastructure/Images.repository.impl';
import { Images_REPOSITORY } from './domain/Images.repository';
import { CreateImagesUseCase } from './application/commands/create-Images.usecase';
import { DeleteImagesUseCase } from './application/commands/delete-Images.usecase';
import { GetOneImagesUseCase } from './application/queries/getOne-Images.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([ImagesOrm]), FileModule],
  providers: [
    {
      provide: Images_REPOSITORY,
      useClass: ImagesRepositoryImpl,
    },
    CreateImagesUseCase,
    DeleteImagesUseCase,
    GetOneImagesUseCase,
  ],
  controllers: [ImagesController],
})
export class ImagesModule {}
