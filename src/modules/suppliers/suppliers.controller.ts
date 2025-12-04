import { Controller } from '@nestjs/common';
import { Suppliers } from './domain/suppliers.entity';
import { BaseController } from 'src/shared/BaseModule/BaseController';
import { SuppliersOrm } from 'src/database/typeorm/suppliers.orm-entity';
import { SuppliersResponse } from './interface/suppliers.interface';
import { CreateSuppliersDto } from './dto/create-Suppliers.dto';
import { UpdateSuppliersDto } from './dto/update-Suppliers.dto';
import { CreateSuppliersUseCase } from './application/commands/create-Suppliers.usecase';
import { UpdateSuppliersUseCase } from './application/commands/update-Suppliers.usecase';
import { FindOneSuppliersUseCase } from './application/queries/findOne-Suppliers.usecase';
import { FindAllSuppliersUseCase } from './application/queries/find-Suppliers.usecase';
import { HardDeleteSuppliersUseCase } from './application/commands/hard-Suppliers.usecase';
import { SoftDeleteSuppliersUseCase } from './application/commands/soft-Suppliers.usecase';
import { RestoreSuppliersUseCase } from './application/commands/restore-Suppliers.usecase';
import { SuppliersMapper } from './infrastructure/suppliers.mapper';

@Controller('suppliers')
export class SuppliersController extends BaseController<
  Suppliers,
  SuppliersOrm,
  SuppliersResponse,
  CreateSuppliersDto,
  UpdateSuppliersDto
> {
  constructor(
    protected createsuppliersUseCase: CreateSuppliersUseCase,
    protected updatesuppliersUseCase: UpdateSuppliersUseCase,
    protected findOnesuppliersUseCase: FindOneSuppliersUseCase,
    protected findAllsuppliersUseCase: FindAllSuppliersUseCase,
    protected hardDeletesuppliersUseCase: HardDeleteSuppliersUseCase,
    protected softDeletesuppliersUseCase: SoftDeleteSuppliersUseCase,
    protected restoresuppliersUseCase: RestoreSuppliersUseCase,
  ) {
    super(
      SuppliersMapper,
      createsuppliersUseCase,
      updatesuppliersUseCase,
      findOnesuppliersUseCase,
      findAllsuppliersUseCase,
      hardDeletesuppliersUseCase,
      softDeletesuppliersUseCase,
      restoresuppliersUseCase,
    );
  }
  
}
