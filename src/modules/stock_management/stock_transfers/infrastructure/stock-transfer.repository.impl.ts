import { EntityManager } from 'typeorm';
import { StockTransfer } from '../domain/stock-transfer.entity';
import { IStockTransferRepository } from '../domain/stock-transfer.repository';
import { Stock_transfersOrm } from 'src/database/typeorm/stock_transfers.orm-entity';
import { StockTransferMapper } from './stock-transfer.mapper';

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

  async save(
    manager: EntityManager,
    domain: StockTransfer,
  ): Promise<{ message: string }> {
    await manager.update(
      Stock_transfersOrm,
      { id: domain.id },
      this.mapper.toSchema(domain),
    );

    return { message: 'Stock transfer saved successfully' };
  }
}
