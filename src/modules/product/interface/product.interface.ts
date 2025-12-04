import { CategoryOrm } from 'src/database/typeorm/category.orm-entity';
import { Category } from 'src/modules/category/domain/category.entity';
import { CategoryResponse } from 'src/modules/category/interface/category.interface';
import {
  ShardInterfaceProps,
  ShardInterfaceResponse,
} from 'src/shared/BaseModule/interface/Base.interface';

export interface ProductProps extends ShardInterfaceProps {
  name: string;
  brand: string;
  category?: Category | null;
  description?: string;
  barcode?: string;
  is_active?: boolean;
}

export interface ProductResponse extends ShardInterfaceResponse {
  name: string;
  brand: string;
  category?: CategoryResponse | null;
  description?: string;
  barcode?: string;
  is_active: boolean;
}
