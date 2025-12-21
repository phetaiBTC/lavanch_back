
  import { BaseMapper } from 'src/shared/BaseModule/infrastructure/base.mapper';
  import { Stock_movementsResponse } from '../interface/stock_movements.interface';
  import { Stock_movementsOrm } from 'src/database/typeorm/stock_movements.orm-entity';
  import { Stock_movements } from '../domain/stock_movements.entity';
  class Stock_movementsMapperClass extends BaseMapper<Stock_movements, Stock_movementsOrm, Stock_movementsResponse> {
    toDomain = (schema: Stock_movementsOrm): Stock_movements => {
      return new Stock_movements({
        id: schema.id,
        name: schema.name,
        ...this.getTimestampsFromSchema(schema),
      });
    };
    toSchema(domain: Stock_movements): Stock_movementsOrm {
      const schema = new Stock_movementsOrm();
      if (domain.value.id != null) schema.id = domain.value.id;
      schema.name = domain.value.name;

      return schema;
    }
    toResponse(domain: Stock_movements): Stock_movementsResponse {
      return {
        id: domain.value.id!,
        name: domain.value.name,
        ...this.getFormattedTimestamps(domain),
      };
    }
  }

  export const Stock_movementsMapper = new Stock_movementsMapperClass();
  
  