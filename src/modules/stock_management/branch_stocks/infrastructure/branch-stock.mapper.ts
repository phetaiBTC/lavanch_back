import { Injectable } from '@nestjs/common';
import { Branch_stocksOrm } from 'src/database/typeorm/branch_stocks.orm-entity';
import { BranchStock } from '../domain/branch-stock.entity';
import { BranchStockResponse } from '../interface/branch-stocks.interface';

@Injectable()
export class BranchStockMapper {
  toDomain(orm: Branch_stocksOrm): BranchStock {
    return new BranchStock({
      branchId: orm.branch.id,
      productVariantId: orm.variant.id,
      quantity: orm.quantity,
      reservedQuantity: orm.reserved_quantity,
    });
  }
  toResponse(orm: Branch_stocksOrm): BranchStockResponse {
    return {
      id: orm.id,
      branch: orm.branch,
      variant: orm.variant,
      quantity: orm.quantity,
      reservedQuantity: orm.reserved_quantity,
    };
  }
}
