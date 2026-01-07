import { Injectable } from '@nestjs/common';
import { Stock_movementsOrm } from 'src/database/typeorm/stock_movements.orm-entity';
import { StockMovement } from '../domain/stock-movement.entity';
import { BranchesOrm } from 'src/database/typeorm/branches.orm-entity';
import { ProductVariantOrm } from 'src/database/typeorm/product-variant.orm-entity';
import { ProductLotOrm } from 'src/database/typeorm/product_lot.orm-entity';
import { UserOrm } from 'src/database/typeorm/user.orm-entity';

export interface StockMovementResponse {
  id: number;
  branch: any;
  productVariant: any;
  productLot: any;
  movementType: string;
  quantity: number;
  referenceTable: string;
  referenceId: number;
  movementDate: Date;
  createdBy: any;
}

@Injectable()
export class StockMovementMapper {
  toDomain(orm: Stock_movementsOrm): StockMovement {
    return new StockMovement({
      id: orm.id,
      branchId: orm.branch.id,
      productVariantId: orm.product_variant.id,
      productLotId: orm.product_lot.id,
      movementType: orm.movement_type,
      quantity: orm.quantity,
      referenceTable: orm.reference_table,
      referenceId: orm.reference_id,
      movementDate: orm.movement_date,
      createdBy: orm.created_by.id,
    });
  }
  toSchema(
    domain: StockMovement,
    orm: {
      branch: BranchesOrm;
      variant: ProductVariantOrm;
      lot: ProductLotOrm;
      createdBy: UserOrm;
    },
  ): Partial<Stock_movementsOrm> {
    return {
      id: domain.id,
      branch: orm.branch,
      product_variant: orm.variant,
      product_lot: orm.lot,
      movement_type: domain.movementType,
      quantity: domain.quantity,
      reference_table: domain.referenceTable,
      reference_id: domain.referenceId,
      movement_date: domain.movementDate,
      created_by: orm.createdBy,
    };
  }
  toResponse(orm: Stock_movementsOrm): StockMovementResponse {
    return {
      id: orm.id,
      branch: orm.branch,
      productVariant: orm.product_variant,
      productLot: orm.product_lot,
      movementType: orm.movement_type,
      quantity: orm.quantity,
      referenceTable: orm.reference_table,
      referenceId: orm.reference_id,
      movementDate: orm.movement_date,
      createdBy: orm.created_by,
    };
  }
}
