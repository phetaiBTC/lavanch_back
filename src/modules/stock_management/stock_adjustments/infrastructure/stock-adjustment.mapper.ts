import { Injectable } from '@nestjs/common';
import { BranchesOrm } from 'src/database/typeorm/branches.orm-entity';
import { ProductVariantOrm } from 'src/database/typeorm/product-variant.orm-entity';
import { ProductLotOrm } from 'src/database/typeorm/product_lot.orm-entity';
import { UserOrm } from 'src/database/typeorm/user.orm-entity';
import { StockAdjustment } from '../domain/stock-adjustment.entity';
import { Stock_adjustmentsOrm } from 'src/database/typeorm/stock_adjustments.orm-entity';
import { StockAdjustmentItem } from '../domain/stock-adjustment-item.entity';
import { Stock_adjustment_itemsOrm } from 'src/database/typeorm/stock_adjustment_items.orm-entity';

export interface StockAdjustmentResponse {
  id: number;
}

@Injectable()
export class StockAdjustmentMapper {
  toDomain(orm: Stock_adjustmentsOrm): StockAdjustment {
    return new StockAdjustment({
      id: orm.id,
      branchId: orm.branch.id,
      adjustmentNo: orm.adjustment_no,
      description: orm.description,
      approvedBy: orm.adjusted_by.id,
      createdBy: orm.created_by.id,
      status: orm.status,
      items: orm.stock_adjustment_items.map(
        (i) =>
          new StockAdjustmentItem({
            productVariantId: i.product_variant.id,
            productLotId: i.product_lot.id,
            systemQuantity: i.system_quantity,
            actualQuantity: i.actual_quantity,
          }),
      ),
    });
  }
  toSchema(
    domain: StockAdjustment,
    orm: {
      branch: BranchesOrm;
      createdBy: UserOrm;
      approvedBy: UserOrm;
      stock_adjustment_items: Stock_adjustment_itemsOrm[];
    },
  ): Stock_adjustmentsOrm {
    const schema =  new Stock_adjustmentsOrm()
    if(domain.id)
    schema.id = domain.id
    schema.branch = orm.branch 
    schema.adjustment_no = domain.adjustmentNo
    schema.description = domain.description
    schema.status = domain.status
    schema.adjustment_date = new Date()
    schema.created_by = orm.createdBy
    schema.adjusted_by = orm.approvedBy
    schema.stock_adjustment_items = orm.stock_adjustment_items
    return schema

    };
  
  toResponse(orm: Stock_adjustmentsOrm): StockAdjustmentResponse {
    return {
      id: orm.id
    };
  }
}
