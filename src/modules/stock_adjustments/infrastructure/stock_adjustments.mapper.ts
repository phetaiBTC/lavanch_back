
  import { BaseMapper } from 'src/shared/BaseModule/infrastructure/base.mapper';
  import { Stock_adjustmentsResponse } from '../interface/stock_adjustments.interface';
  import { Stock_adjustmentsOrm } from 'src/database/typeorm/stock_adjustments.orm-entity';
  import { Stock_adjustments } from '../domain/stock_adjustments.entity';
  class Stock_adjustmentsMapperClass extends BaseMapper<Stock_adjustments, Stock_adjustmentsOrm, Stock_adjustmentsResponse> {
    toDomain = (schema: Stock_adjustmentsOrm): Stock_adjustments => {
      return new Stock_adjustments({
        id: schema.id,
        name: schema.name,
        ...this.getTimestampsFromSchema(schema),
      });
    };
    toSchema(domain: Stock_adjustments): Stock_adjustmentsOrm {
      const schema = new Stock_adjustmentsOrm();
      if (domain.value.id != null) schema.id = domain.value.id;
      schema.name = domain.value.name;

      return schema;
    }
    toResponse(domain: Stock_adjustments): Stock_adjustmentsResponse {
      return {
        id: domain.value.id!,
        name: domain.value.name,
        ...this.getFormattedTimestamps(domain),
      };
    }
  }

  export const Stock_adjustmentsMapper = new Stock_adjustmentsMapperClass();
  
  