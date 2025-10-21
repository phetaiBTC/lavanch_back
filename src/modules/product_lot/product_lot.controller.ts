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
// import { CreateProductLotDto } from './dto/create-ProductLot.dto';
// import { UpdateProductLotDto } from './dto/update-ProductLot.dto';
// import { PaginationDto } from 'src/shared/dto/pagination.dto';
// import { CreateProductLotUseCase } from './application/commands/create-ProductLot.usecase';
// import { UpdateProductLotUseCase } from './application/commands/update-ProductLot.usecase';
// import { HardDeleteProductLotUseCase } from './application/commands/hard-ProductLot.usecase';
// import { SoftDeleteProductLotUseCase } from './application/commands/soft-ProductLot.usecase';
// import { RestoreProductLotUseCase } from './application/commands/restore-ProductLot.usecase';
// import { FindOneProductLotUseCase } from './application/queries/findOne-ProductLot.usecase';
// import { FindAllProductLotUseCase } from './application/queries/find-ProductLot.usecase';
// import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
// import { ProductLotMapper } from './infrastructure/product_lot.mapper';
// import { ProductLotResponse } from './interface/product_lot.interface';
// @Controller('product_lot')
// export class ProductLotController {
//   constructor(
//     private readonly createProductLotUseCase: CreateProductLotUseCase,
//     private readonly updateProductLotUseCase: UpdateProductLotUseCase,
//     private readonly hardDeleteProductLotUseCase: HardDeleteProductLotUseCase,
//     private readonly softDeleteProductLotUseCase: SoftDeleteProductLotUseCase,
//     private readonly restoreProductLotUseCase: RestoreProductLotUseCase,
//     private readonly findOneProductLotUseCase: FindOneProductLotUseCase,
//     private readonly findAllProductLotUseCase: FindAllProductLotUseCase,
//   ) {}
//   @Post() async create(
//     @Body() dto: CreateProductLotDto,
//   ): Promise<ProductLotResponse> {
//     return ProductLotMapper.toResponse(
//       await this.createProductLotUseCase.execute(dto),
//     );
//   }
//   @Get() async findAll(
//     @Query() query: PaginationDto,
//   ): Promise<PaginatedResponse<ProductLotResponse>> {
//     return ProductLotMapper.toResponseList(
//       await this.findAllProductLotUseCase.execute(query),
//     );
//   }
//   @Get(':id') async findOne(
//     @Param('id') id: number,
//   ): Promise<ProductLotResponse> {
//     return ProductLotMapper.toResponse(
//       await this.findOneProductLotUseCase.execute(id),
//     );
//   }
//   @Patch(':id') async update(
//     @Param('id') id: number,
//     @Body() dto: UpdateProductLotDto,
//   ): Promise<ProductLotResponse> {
//     return ProductLotMapper.toResponse(
//       await this.updateProductLotUseCase.execute(id, dto),
//     );
//   }
//   @Delete('soft/:id') async softDelete(
//     @Param('id') id: number,
//   ): Promise<{ message: string }> {
//     return await this.softDeleteProductLotUseCase.execute(+id);
//   }
//   @Delete('hard/:id') async hardDelete(
//     @Param('id') id: number,
//   ): Promise<{ message: string }> {
//     return await this.hardDeleteProductLotUseCase.execute(+id);
//   }
//   @Patch('restore/:id') async restore(
//     @Param('id') id: number,
//   ): Promise<{ message: string }> {
//     return await this.restoreProductLotUseCase.execute(+id);
//   }
// }


import { Controller } from '@nestjs/common';
import { ProductLot } from './domain/product_lot.entity';
import { ProductLotOrm } from 'src/database/typeorm/product_lot.orm-entity';
import { ProductLotResponse } from './interface/product_lot.interface';
import { CreateProductLotDto } from './dto/create-ProductLot.dto';
import { UpdateProductLotDto } from './dto/update-ProductLot.dto';
import { ProductLotMapper } from './infrastructure/product_lot.mapper';
import { CreateProductLotUseCase } from './application/commands/create-ProductLot.usecase';
import { UpdateProductLotUseCase } from './application/commands/update-ProductLot.usecase';
import { FindOneProductLotUseCase } from './application/queries/findOne-ProductLot.usecase';
import { FindAllProductLotUseCase } from './application/queries/find-ProductLot.usecase';
import { HardDeleteProductLotUseCase } from './application/commands/hard-ProductLot.usecase';
import { SoftDeleteProductLotUseCase } from './application/commands/soft-ProductLot.usecase';
import { RestoreProductLotUseCase } from './application/commands/restore-ProductLot.usecase';
import { BaseController } from 'src/shared/Controller/BaseController';

@Controller('product_lot')
export class ProductLotController extends BaseController<
  ProductLot,
  ProductLotOrm,
  ProductLotResponse,
  CreateProductLotDto,
  UpdateProductLotDto
> {
  constructor(
    createProductLotUseCase: CreateProductLotUseCase,
    updateProductLotUseCase: UpdateProductLotUseCase,
    findOneProductLotUseCase: FindOneProductLotUseCase,
    findAllProductLotUseCase: FindAllProductLotUseCase,
    hardDeleteProductLotUseCase: HardDeleteProductLotUseCase,
    softDeleteProductLotUseCase: SoftDeleteProductLotUseCase,
    restoreProductLotUseCase: RestoreProductLotUseCase,
  ) {
    super(
      ProductLotMapper,
      createProductLotUseCase,
      updateProductLotUseCase,
      findOneProductLotUseCase,
      findAllProductLotUseCase,
      hardDeleteProductLotUseCase,
      softDeleteProductLotUseCase,
      restoreProductLotUseCase,
    );
  }
}
