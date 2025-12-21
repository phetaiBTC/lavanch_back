
  import { BaseMapper } from 'src/shared/BaseModule/infrastructure/base.mapper';
  import { Branch_stocksResponse } from '../interface/branch_stocks.interface';
  import { Branch_stocksOrm } from 'src/database/typeorm/branch_stocks.orm-entity';
  import { Branch_stocks } from '../domain/branch_stocks.entity';
  class Branch_stocksMapperClass extends BaseMapper<Branch_stocks, Branch_stocksOrm, Branch_stocksResponse> {
    toDomain = (schema: Branch_stocksOrm): Branch_stocks => {
      return new Branch_stocks({
        id: schema.id,
        name: schema.name,
        ...this.getTimestampsFromSchema(schema),
      });
    };
    toSchema(domain: Branch_stocks): Branch_stocksOrm {
      const schema = new Branch_stocksOrm();
      if (domain.value.id != null) schema.id = domain.value.id;
      schema.name = domain.value.name;

      return schema;
    }
    toResponse(domain: Branch_stocks): Branch_stocksResponse {
      return {
        id: domain.value.id!,
        name: domain.value.name,
        ...this.getFormattedTimestamps(domain),
      };
    }
  }

  export const Branch_stocksMapper = new Branch_stocksMapperClass();
  
  