
  import { BaseMapper } from 'src/shared/BaseModule/infrastructure/base.mapper';
  import { Stock_transfersResponse } from '../interface/stock_transfers.interface';
  import { Stock_transfersOrm } from 'src/database/typeorm/stock_transfers.orm-entity';
  import { Stock_transfers } from '../domain/stock_transfers.entity';
  class Stock_transfersMapperClass extends BaseMapper<Stock_transfers, Stock_transfersOrm, Stock_transfersResponse> {
    toDomain = (schema: Stock_transfersOrm): Stock_transfers => {
      return new Stock_transfers({
        id: schema.id,
        name: schema.name,
        ...this.getTimestampsFromSchema(schema),
      });
    };
    toSchema(domain: Stock_transfers): Stock_transfersOrm {
      const schema = new Stock_transfersOrm();
      if (domain.value.id != null) schema.id = domain.value.id;
      schema.name = domain.value.name;

      return schema;
    }
    toResponse(domain: Stock_transfers): Stock_transfersResponse {
      return {
        id: domain.value.id!,
        name: domain.value.name,
        ...this.getFormattedTimestamps(domain),
      };
    }
  }

  export const Stock_transfersMapper = new Stock_transfersMapperClass();
  
  