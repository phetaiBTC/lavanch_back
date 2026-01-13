import { Injectable, NotFoundException } from '@nestjs/common';
import { IInboundOrderRepository } from '../domain/inbound-order.repository';
import { InboundOrder } from '../domain/inbound-order.entity';
import { EntityManager, In, Repository } from 'typeorm';
import { InboundOrderMapper } from './inbound.mapper';
import { SuppliersOrm } from 'src/database/typeorm/suppliers.orm-entity';
import { BranchesOrm } from 'src/database/typeorm/branches.orm-entity';
import { CurrenciesOrm } from 'src/database/typeorm/currencies.orm-entity';
import { UserOrm } from 'src/database/typeorm/user.orm-entity';
import { Inbound_ordersOrm } from 'src/database/typeorm/inbound_orders.orm-entity';
import { ProductVariantOrm } from 'src/database/typeorm/product-variant.orm-entity';
import { UnitOrm } from 'src/database/typeorm/unit.orm-entity';
import { ProductLotOrm } from 'src/database/typeorm/product_lot.orm-entity';
import { Inbound_order_itemsOrm } from 'src/database/typeorm/inbound_order_items.orm-entity';
import { ProductUnitOrm } from 'src/database/typeorm/product-unit.orm-entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SelectQueryBuilder } from 'typeorm/browser';

@Injectable()
export class InboundOrderRepositoryImpl implements IInboundOrderRepository {
  constructor(
    private mapper: InboundOrderMapper,
    @InjectRepository(Inbound_ordersOrm)
    private readonly repo: Repository<Inbound_ordersOrm>,
  ) {}
  createQueryBuilder(
    manager: EntityManager,
  ): SelectQueryBuilder<Inbound_ordersOrm> {
    return manager
      .getRepository(Inbound_ordersOrm)
      .createQueryBuilder('inbound_orders')
      .leftJoinAndSelect('inbound_orders.supplier', 'supplier')
      .leftJoinAndSelect('inbound_orders.branch', 'branch')
      .leftJoinAndSelect('inbound_orders.currency', 'currency')
      .leftJoinAndSelect('inbound_orders.created_by', 'created_by')
      .leftJoinAndSelect(
        'inbound_orders.inbound_order_items',
        'inbound_order_items',
      )
      .leftJoinAndSelect('inbound_order_items.unit', 'unit')
      .leftJoinAndSelect('inbound_order_items.variant', 'variant')
      .leftJoinAndSelect('inbound_order_items.product_lot', 'product_lot');
  }

  async save(manager: EntityManager, domain: InboundOrder): Promise<void> {
    // order
    const [supplier, branch, currency, created_by] = await Promise.all([
      manager.findOneByOrFail(SuppliersOrm, { id: domain.supplier_id }),
      manager.findOneByOrFail(BranchesOrm, { id: domain.branch_id }),
      manager.findOneByOrFail(CurrenciesOrm, { id: domain.currency_id }),
      manager.findOneByOrFail(UserOrm, { id: domain.created_by }),
    ]);
    const orm = this.mapper.toSchema(domain, {
      supplier,
      branch,
      currency,
      created_by,
    });
    const inboundOrm = await manager.save(Inbound_ordersOrm, orm);

    // items
    const variantIds = [
      ...new Set(domain.getItems.map((i) => i.productVariantId)),
    ];
    const unitIds = [...new Set(domain.getItems.map((i) => i.unitId))];
    const lotIds = [
      ...new Set(domain.getItems.map((i) => i.productLotId).filter(Boolean)),
    ];
    const [variants, units, lots, productUnits] = await Promise.all([
      manager.find(ProductVariantOrm, { where: { id: In(variantIds) } }),
      manager.find(UnitOrm, { where: { id: In(unitIds) } }),
      manager.find(ProductLotOrm, { where: { id: In(lotIds) } }),
      manager.find(ProductUnitOrm, {
        where: {
          unit: In(unitIds),
          product_variant: In(variantIds),
        },
      }),
    ]);
    const variantMap = new Map(variants.map((v) => [v.id, v]));
    const unitMap = new Map(units.map((u) => [u.id, u]));
    const lotMap = new Map(lots.map((l) => [l.id, l]));
    const unitVariantMap = new Map(productUnits.map((p) => [p.id, p]));

    const items = domain.getItems.map((i) => {
      const unitVariant = unitVariantMap.get(i.productVariantId);
      if (!unitVariant) {
        throw new NotFoundException(
          `ProductUnit not found: ${i.productVariantId}`,
        );
      }
      i.setPiecesPerUnit(unitVariant.quantity_per_unit);
      // console.log(i)
      const variant = variantMap.get(i.productVariantId);
      if (!variant) {
        throw new NotFoundException(
          `ProductVariant not found: ${i.productVariantId}`,
        );
      }
      const unit = unitMap.get(i.unitId);
      if (!unit) {
        throw new NotFoundException(`unit not found: ${i.unitId}`);
      }
      let lot: ProductLotOrm | undefined;
      if (i.productLotId) {
        lot = lotMap.get(i.productLotId);
        if (!lot) {
          throw new NotFoundException(
            `ProductLot not found: ${i.productLotId}`,
          );
        }
      }

      return this.mapper.toSchemaItem(i, {
        variant,
        unit,
        lot,
        inbound_orders: inboundOrm,
      });
    });
    await manager.save(Inbound_order_itemsOrm, items);
  }
  async loadById(
    manager: EntityManager,
    id: number,
  ): Promise<InboundOrder | null> {
    const order = await this.createQueryBuilder(manager).where({ id }).getOne();
    // console.log(order);
    return order ? this.mapper.toDomain(order) : null;
  }
}
