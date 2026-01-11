import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateSupplierUseCase } from './applications/commands/create-supplier.usecase';
import { UpdateSupplierUseCase } from './applications/commands/update-supplier.usecase';
import { SoftDeleteSupplierUseCase } from './applications/commands/soft-supplier.usecase';
import { HardDeleteSupplierUseCase } from './applications/commands/hard-supplier.usecase';
import { RestoreSupplierUseCase } from './applications/commands/restore-supplier.usecase';
import { FindOneSupplierUseCase } from './applications/queries/findOne-supplier.usecase';
import { FindAllSupplierUseCase } from './applications/queries/find-supplier.usecase';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { IdArrayDto } from 'src/shared/BaseModule/dto/id.dto';

@Controller('suppliers')
export class SuppliersController {
  constructor(
    private readonly createSupplierUseCase: CreateSupplierUseCase,
    private readonly updateSupplierUseCase: UpdateSupplierUseCase,
    private readonly softDeleteSupplierUseCase: SoftDeleteSupplierUseCase,
    private readonly hardDeleteSupplierUseCase: HardDeleteSupplierUseCase,
    private readonly restoreSupplierUseCase: RestoreSupplierUseCase,
    private readonly findOneSupplierUseCase: FindOneSupplierUseCase,
    private readonly findAllSupplierUseCase: FindAllSupplierUseCase,
  ) {}
  @Patch('restore')
  async restore(@Body() body: IdArrayDto) {
    return await this.restoreSupplierUseCase.execute(body.ids);
  }
  @Post()
  async create(@Body() body: CreateSupplierDto) {
    return await this.createSupplierUseCase.execute(body);
  }
  @Get()
  async findAll(@Query() query: PaginationDto) {
    return await this.findAllSupplierUseCase.execute(query);
  }
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.findOneSupplierUseCase.execute(id);
  }
  @Patch(':id')
  async update(@Query('id') id: number, @Body() body: any) {
    return await this.updateSupplierUseCase.execute(id, body);
  }
  @Delete('soft')
  async softDelete(@Body() body: IdArrayDto) {
    return await this.softDeleteSupplierUseCase.execute(body.ids);
  }
  @Delete('hard')
  async hardDelete(@Body() body: IdArrayDto) {
    return await this.hardDeleteSupplierUseCase.execute(body.ids);
  }

}
