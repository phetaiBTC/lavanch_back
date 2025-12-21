
  import { BaseMapper } from 'src/shared/BaseModule/infrastructure/base.mapper';
  import { Stock_adjustment_itemsResponse } from '../interface/stock_adjustment_items.interface';
  import { Stock_adjustment_itemsOrm } from 'src/database/typeorm/stock_adjustment_items.orm-entity';
  import { Stock_adjustment_items } from '../domain/stock_adjustment_items.entity';
  class Stock_adjustment_itemsMapperClass extends BaseMapper<Stock_adjustment_items, Stock_adjustment_itemsOrm, Stock_adjustment_itemsResponse> {
    toDomain = (schema: Stock_adjustment_itemsOrm): Stock_adjustment_items => {
      return new Stock_adjustment_items({
        id: schema.id,
        name: schema.name,
        ...this.getTimestampsFromSchema(schema),
      });
    };
    toSchema(domain: Stock_adjustment_items): Stock_adjustment_itemsOrm {
      const schema = new Stock_adjustment_itemsOrm();
      if (domain.value.id != null) schema.id = domain.value.id;
      schema.name = domain.value.name;

      return schema;
    }
    toResponse(domain: Stock_adjustment_items): Stock_adjustment_itemsResponse {
      return {
        id: domain.value.id!,
        name: domain.value.name,
        ...this.getFormattedTimestamps(domain),
      };
    }
  }

  export const Stock_adjustment_itemsMapper = new Stock_adjustment_itemsMapperClass();
  
  