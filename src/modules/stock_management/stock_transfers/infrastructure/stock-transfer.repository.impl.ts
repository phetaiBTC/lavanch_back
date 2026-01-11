import { EntityManager, In, Repository } from 'typeorm';
import { StockTransfer } from '../domain/stock-transfer.entity';
import { IStockTransferRepository } from '../domain/stock-transfer.repository';
import { Stock_transfersOrm } from 'src/database/typeorm/stock_transfers.orm-entity';
import { StockTransferMapper } from './stock-transfer.mapper';
import { BranchesOrm } from 'src/database/typeorm/branches.orm-entity';
import { UserOrm } from 'src/database/typeorm/user.orm-entity';
import { ProductVariantOrm } from 'src/database/typeorm/product-variant.orm-entity';
import { ProductLotOrm } from 'src/database/typeorm/product_lot.orm-entity';
import { Stock_transfer_itemsOrm } from 'src/database/typeorm/stock_transfer_items.orm-entity';
import { Inject, NotFoundException } from '@nestjs/common';

export class StockTransferRepositoryImpl implements IStockTransferRepository {
  constructor(private readonly mapper: StockTransferMapper) {}
  async findById(manager: EntityManager, id: number): Promise<StockTransfer> {
    const orm = await manager.findOneOrFail(Stock_transfersOrm, {
      where: { id },
      relations: [
        'from_branch',
        'to_branch',
        'stock_transfer_items',
        'stock_transfer_items.product_variant',
        'stock_transfer_items.product_lot',
      ],
    });

    return this.mapper.toDomain(orm);
  }
  async save(manager: EntityManager, domain: StockTransfer): Promise<void> {
    const [from_branch, to_branch, created_by] = await Promise.all([
      manager.findOneByOrFail(BranchesOrm, { id: domain.fromBranchId }),
      manager.findOneByOrFail(BranchesOrm, { id: domain.toBranchId }),
      manager.findOneByOrFail(UserOrm, { id: domain.created_by }),
    ]);

    // 1️⃣ Save Aggregate Root
    const transferOrm = await manager.save(
      Stock_transfersOrm,
      this.mapper.toSchema(domain, {
        from_branch,
        to_branch,
        created_by,
      }),
    );

    // 2️⃣ Prepare lookup
    const variantIds = [
      ...new Set(domain.getItems.map((i) => i.productVariantId)),
    ];
    const lotIds = [
      ...new Set(domain.getItems.map((i) => i.productLotId).filter(Boolean)),
    ];

    const [variants, lots] = await Promise.all([
      manager.find(ProductVariantOrm, { where: { id: In(variantIds) } }),
      manager.find(ProductLotOrm, { where: { id: In(lotIds) } }),
    ]);

    const variantMap = new Map(variants.map((v) => [v.id, v]));
    const lotMap = new Map(lots.map((l) => [l.id, l]));

    // 3️⃣ Save children
    const items = domain.getItems.map((i) => {
      const variant = variantMap.get(i.productVariantId);
      if (!variant) {
        throw new NotFoundException(
          `ProductVariant not found: ${i.productVariantId}`,
        );
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
        stock_transfers: transferOrm,
        product_variant: variant,
        product_lot: lot,
      });
    });

    await manager.save(Stock_transfer_itemsOrm, items);
  }
  async approve(manager: EntityManager, domain: StockTransfer): Promise<void> {
    await manager.update(
      Stock_transfersOrm,
      { id: domain.id },
      { status: domain.getStatus() },
    );
  }
}
