
  
  import { ShardOrm } from 'src/shared/typeorm/base.orm-entity';
  import { Entity, Column, ManyToOne, JoinTable } from 'typeorm';
import { Inbound_ordersOrm } from './inbound_orders.orm-entity';
import { ProductVariantOrm } from './product-variant.orm-entity';
import { UnitOrm } from './unit.orm-entity';
import { ProductLotOrm } from './product_lot.orm-entity';
  
  @Entity('inbound_order_items')
  export class Inbound_order_itemsOrm extends ShardOrm {
    @ManyToOne(() => Inbound_ordersOrm, (inbound_orders) => inbound_orders.inbound_order_items)
    inbound_orders: Inbound_ordersOrm

    @ManyToOne(()=> ProductVariantOrm, (variant) => variant.inbound_order_items)
    variant: ProductVariantOrm

    @Column({ type: 'int' })
    quantity: number

    @ManyToOne(()=> UnitOrm, (unit) => unit.inbound_order_items)
    unit: UnitOrm

    @Column({ type: 'decimal', precision: 12, scale: 2 })
    unit_price: number

    @Column({ type: 'decimal', precision: 12, scale: 2 })
    total_price: number

    @Column({ type: 'decimal', precision: 12, scale: 2 })
    total_pieces: number

    @ManyToOne(()=>ProductLotOrm, (lot) => lot.inbound_order_items)
    product_lot: ProductLotOrm

    @Column({ type: 'int' })
    received_quantity: number
  }
  
  
  