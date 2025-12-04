// import {
//   Controller,
//   Get,
//   Post,
//   Body,
//   Param,
//   Patch,
//   Delete,
//   Query,
// } from '@nestjs/common';
// import { CreateProductPointDto } from './dto/create-ProductPoint.dto';
// import { UpdateProductPointDto } from './dto/update-ProductPoint.dto';
// import { PaginationDto } from 'src/shared/dto/pagination.dto';
// import { CreateProductPointUseCase } from './application/commands/create-ProductPoint.usecase';
// import { UpdateProductPointUseCase } from './application/commands/update-ProductPoint.usecase';
// import { HardDeleteProductPointUseCase } from './application/commands/hard-ProductPoint.usecase';
// import { SoftDeleteProductPointUseCase } from './application/commands/soft-ProductPoint.usecase';
// import { RestoreProductPointUseCase } from './application/commands/restore-ProductPoint.usecase';
// import { FindOneProductPointUseCase } from './application/queries/findOne-ProductPoint.usecase';
// import { FindAllProductPointUseCase } from './application/queries/find-ProductPoint.usecase';
// import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
// import { ProductPointMapper } from './infrastructure/product_point.mapper';
// import { ProductPointResponse } from './interface/product_point.interface';
// @Controller('product_point')
// export class ProductPointController {
//   constructor(
//     private readonly createProductPointUseCase: CreateProductPointUseCase,
//     private readonly updateProductPointUseCase: UpdateProductPointUseCase,
//     private readonly hardDeleteProductPointUseCase: HardDeleteProductPointUseCase,
//     private readonly softDeleteProductPointUseCase: SoftDeleteProductPointUseCase,
//     private readonly restoreProductPointUseCase: RestoreProductPointUseCase,
//     private readonly findOneProductPointUseCase: FindOneProductPointUseCase,
//     private readonly findAllProductPointUseCase: FindAllProductPointUseCase,
//   ) {}
//   @Post() async create(
//     @Body() dto: CreateProductPointDto,
//   ): Promise<ProductPointResponse> {
//     return ProductPointMapper.toResponse(
//       await this.createProductPointUseCase.execute(dto),
//     );
//   }
//   @Get() async findAll(
//     @Query() query: PaginationDto,
//   ): Promise<PaginatedResponse<ProductPointResponse>> {
//     return ProductPointMapper.toResponseList(
//       await this.findAllProductPointUseCase.execute(query),
//     );
//   }
//   @Get(':id') async findOne(
//     @Param('id') id: number,
//   ): Promise<ProductPointResponse> {
//     return ProductPointMapper.toResponse(
//       await this.findOneProductPointUseCase.execute(id),
//     );
//   }
//   @Patch(':id') async update(
//     @Param('id') id: number,
//     @Body() dto: UpdateProductPointDto,
//   ): Promise<ProductPointResponse> {
//     return ProductPointMapper.toResponse(
//       await this.updateProductPointUseCase.execute(id, dto),
//     );
//   }
//   @Delete('soft/:id') async softDelete(
//     @Param('id') id: number,
//   ): Promise<{ message: string }> {
//     return await this.softDeleteProductPointUseCase.execute(+id);
//   }
//   @Delete('hard/:id') async hardDelete(
//     @Param('id') id: number,
//   ): Promise<{ message: string }> {
//     return await this.hardDeleteProductPointUseCase.execute(+id);
//   }
//   @Patch('restore/:id') async restore(
//     @Param('id') id: number,
//   ): Promise<{ message: string }> {
//     return await this.restoreProductPointUseCase.execute(+id);
//   }
// }

import { Controller } from '@nestjs/common';
import { ProductPoint } from './domain/product_point.entity';
import { ProductPointOrm } from 'src/database/typeorm/product_point.orm-entity';
import { ProductPointResponse } from './interface/product_point.interface';
import { CreateProductPointDto } from './dto/create-ProductPoint.dto';
import { UpdateProductPointDto } from './dto/update-ProductPoint.dto';
import { ProductPointMapper } from './infrastructure/product_point.mapper';
import { CreateProductPointUseCase } from './application/commands/create-ProductPoint.usecase';
import { UpdateProductPointUseCase } from './application/commands/update-ProductPoint.usecase';
import { FindOneProductPointUseCase } from './application/queries/findOne-ProductPoint.usecase';
import { FindAllProductPointUseCase } from './application/queries/find-ProductPoint.usecase';
import { HardDeleteProductPointUseCase } from './application/commands/hard-ProductPoint.usecase';
import { SoftDeleteProductPointUseCase } from './application/commands/soft-ProductPoint.usecase';
import { RestoreProductPointUseCase } from './application/commands/restore-ProductPoint.usecase';
import { BaseController } from 'src/shared/BaseModule/BaseController';

@Controller('product_point')
export class ProductPointController extends BaseController<
  ProductPoint,
  ProductPointOrm,
  ProductPointResponse,
  CreateProductPointDto,
  UpdateProductPointDto
> {
  constructor(
    createProductPointUseCase: CreateProductPointUseCase,
    updateProductPointUseCase: UpdateProductPointUseCase,
    findOneProductPointUseCase: FindOneProductPointUseCase,
    findAllProductPointUseCase: FindAllProductPointUseCase,
    hardDeleteProductPointUseCase: HardDeleteProductPointUseCase,
    softDeleteProductPointUseCase: SoftDeleteProductPointUseCase,
    restoreProductPointUseCase: RestoreProductPointUseCase,
  ) {
    super(
      ProductPointMapper,
      createProductPointUseCase,
      updateProductPointUseCase,
      findOneProductPointUseCase,
      findAllProductPointUseCase,
      hardDeleteProductPointUseCase,
      softDeleteProductPointUseCase,
      restoreProductPointUseCase,
    );
  }
}
