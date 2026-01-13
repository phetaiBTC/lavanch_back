import { Module } from "@nestjs/common";
import { SuppliersModule } from "./suppliers/suppliers.module";
import { InboundOrdersModule } from "./inbound_orders/inbound-orders.module";
@Module({
    imports: [SuppliersModule,InboundOrdersModule],
    controllers: [],
    providers: [],
    exports: []
})
export class InboundModule {}