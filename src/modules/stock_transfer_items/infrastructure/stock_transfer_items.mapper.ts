
  import { BaseMapper } from 'src/shared/BaseModule/infrastructure/base.mapper';
  import { Stock_transfer_itemsResponse } from '../interface/stock_transfer_items.interface';
  import { Stock_transfer_itemsOrm } from 'src/database/typeorm/stock_transfer_items.orm-entity';
  import { Stock_transfer_items } from '../domain/stock_transfer_items.entity';
  class Stock_transfer_itemsMapperClass extends BaseMapper<Stock_transfer_items, Stock_transfer_itemsOrm, Stock_transfer_itemsResponse> {
    toDomain = (schema: Stock_transfer_itemsOrm): Stock_transfer_items => {
      return new Stock_transfer_items({
        id: schema.id,
        name: schema.name,
        ...this.getTimestampsFromSchema(schema),
      });
    };
    toSchema(domain: Stock_transfer_items): Stock_transfer_itemsOrm {
      const schema = new Stock_transfer_itemsOrm();
      if (domain.value.id != null) schema.id = domain.value.id;
      schema.name = domain.value.name;

      return schema;
    }
    toResponse(domain: Stock_transfer_items): Stock_transfer_itemsResponse {
      return {
        id: domain.value.id!,
        name: domain.value.name,
        ...this.getFormattedTimestamps(domain),
      };
    }
  }

  export const Stock_transfer_itemsMapper = new Stock_transfer_itemsMapperClass();
  
  