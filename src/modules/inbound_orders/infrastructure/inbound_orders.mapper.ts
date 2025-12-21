
  import { BaseMapper } from 'src/shared/BaseModule/infrastructure/base.mapper';
  import { Inbound_ordersResponse } from '../interface/inbound_orders.interface';
  import { Inbound_ordersOrm } from 'src/database/typeorm/inbound_orders.orm-entity';
  import { Inbound_orders } from '../domain/inbound_orders.entity';
  class Inbound_ordersMapperClass extends BaseMapper<Inbound_orders, Inbound_ordersOrm, Inbound_ordersResponse> {
    toDomain = (schema: Inbound_ordersOrm): Inbound_orders => {
      return new Inbound_orders({
        id: schema.id,
        name: schema.name,
        ...this.getTimestampsFromSchema(schema),
      });
    };
    toSchema(domain: Inbound_orders): Inbound_ordersOrm {
      const schema = new Inbound_ordersOrm();
      if (domain.value.id != null) schema.id = domain.value.id;
      schema.name = domain.value.name;

      return schema;
    }
    toResponse(domain: Inbound_orders): Inbound_ordersResponse {
      return {
        id: domain.value.id!,
        name: domain.value.name,
        ...this.getFormattedTimestamps(domain),
      };
    }
  }

  export const Inbound_ordersMapper = new Inbound_ordersMapperClass();
  
  