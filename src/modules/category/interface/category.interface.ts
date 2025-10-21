import { ShardInterfaceProps, ShardInterfaceResponse } from "src/shared/interface/Base.interface";
import { Category } from "../domain/category.entity";

export interface CategoryProps extends ShardInterfaceProps {
  name: string;
  description?: string;
  parent?: Category | null;
  children?: Category[];
  is_active: boolean;
}
export interface CategoryResponse extends ShardInterfaceResponse {
  name: string;
  description?: string;
  parent?: Category | null;
  children: Category[];
  is_active: boolean;
}
