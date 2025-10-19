import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagesOrm } from 'src/database/typeorm/image.orm-entity';
import { FileModule } from '../files/file.module';
import { ImagesController } from './images.controller';
import { ImagesRepositoryImpl } from './infrastructure/images.repository.impl';
import { IMAGES_REPOSITORY } from './domain/images.repository';
import { CreateImagesUseCase } from './application/commands/create-Images.usecase';
import { DeleteImagesUseCase } from './application/commands/delete-Images.usecase';
import { GetOneImagesUseCase } from './application/queries/getOne-Images.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([ImagesOrm]), FileModule],
  providers: [
    {
      provide: IMAGES_REPOSITORY,
      useClass: ImagesRepositoryImpl,
    },
    CreateImagesUseCase,
    DeleteImagesUseCase,
    GetOneImagesUseCase,
  ],
  controllers: [ImagesController],
})
export class ImagesModule {}
