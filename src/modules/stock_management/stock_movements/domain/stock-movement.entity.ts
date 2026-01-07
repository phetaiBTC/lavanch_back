import { StockMovementType } from 'src/database/typeorm/stock_movements.orm-entity';

export interface StockMovementProps {
  id?: number;
  branchId: number;
  productVariantId: number;
  productLotId?: number;
  referenceId?: number;
  referenceTable?: string;
  movementDate: Date;
  createdBy?: number;
  movementType: StockMovementType;
  quantity: number;
}
export class StockMovement {
  readonly id?: number;
  readonly branchId: number;
  readonly productVariantId: number;
  readonly productLotId?: number;
  readonly movementType: StockMovementType;
  readonly quantity: number;
  readonly referenceTable?: string;
  readonly referenceId?: number;
  readonly movementDate: Date = new Date();
  readonly createdBy?: number;
  constructor(props: StockMovementProps) {
    this.id = props.id;
    this.branchId = props.branchId;
    this.productVariantId = props.productVariantId;
    this.productLotId = props.productLotId;
    this.movementType = props.movementType;
    this.quantity = props.quantity;
    this.referenceTable = props.referenceTable;
    this.referenceId = props.referenceId;
    this.movementDate = props.movementDate;
    this.createdBy = props.createdBy;
  }
}
