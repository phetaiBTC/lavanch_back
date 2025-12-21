
  import { BaseMapper } from 'src/shared/BaseModule/infrastructure/base.mapper';
  import { Inbound_order_itemsResponse } from '../interface/inbound_order_items.interface';
  import { Inbound_order_itemsOrm } from 'src/database/typeorm/inbound_order_items.orm-entity';
  import { Inbound_order_items } from '../domain/inbound_order_items.entity';
  class Inbound_order_itemsMapperClass extends BaseMapper<Inbound_order_items, Inbound_order_itemsOrm, Inbound_order_itemsResponse> {
    toDomain = (schema: Inbound_order_itemsOrm): Inbound_order_items => {
      return new Inbound_order_items({
        id: schema.id,
        name: schema.name,
        ...this.getTimestampsFromSchema(schema),
      });
    };
    toSchema(domain: Inbound_order_items): Inbound_order_itemsOrm {
      const schema = new Inbound_order_itemsOrm();
      if (domain.value.id != null) schema.id = domain.value.id;
      schema.name = domain.value.name;

      return schema;
    }
    toResponse(domain: Inbound_order_items): Inbound_order_itemsResponse {
      return {
        id: domain.value.id!,
        name: domain.value.name,
        ...this.getFormattedTimestamps(domain),
      };
    }
  }

  export const Inbound_order_itemsMapper = new Inbound_order_itemsMapperClass();
  
  