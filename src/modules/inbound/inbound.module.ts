import { Module } from "@nestjs/common";
import { SuppliersModule } from "./suppliers/suppliers.module";
@Module({
    imports: [SuppliersModule],
    controllers: [],
    providers: [],
    exports: []
})
export class InboundModule {}