import { Inject, Injectable } from '@nestjs/common';
import { TransactionService } from 'src/shared/utils/transaction.util';
import {
  type IStockMovementRepository,
  STOCK_MOVEMENT_REPOSITORY,
} from '../../domain/stock-movement.repository';
import { StockMovement } from '../../domain/stock-movement.entity';
import { CreateStockMovementDto } from '../../dto/create-stock-movement.dto';
import { type AuthPayload } from 'src/modules/auth/interface/auth.interface';

@Injectable()
export class CreateStockMovementUseCase {
  constructor(
    @Inject(STOCK_MOVEMENT_REPOSITORY)
    private readonly repo: IStockMovementRepository,
    private readonly tx: TransactionService,
  ) {}

  async execute(dto: CreateStockMovementDto,user: AuthPayload,): Promise<{ message: string }> {
    return await this.tx.run(async (manager) => {
      const movement = new StockMovement({
        branchId: dto.branchId,
        productVariantId: dto.productVariantId,
        productLotId: dto.productLotId,
        movementType: dto.movementType,
        quantity: dto.quantity,
        referenceTable: dto.referenceTable,
        referenceId: dto.referenceId,
        movementDate: dto.movementDate,
        createdBy: user.id,
      });

      return await this.repo.save(manager, movement);
    });
  }
}
