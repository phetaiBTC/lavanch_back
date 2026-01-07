import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';
@Injectable()
export class TransactionService {
  constructor(private dataSource: DataSource) {}

  async run<T>(operations: (manager: EntityManager) => Promise<T>): Promise<T> {
    return await this.dataSource.transaction(operations);
  }
}
