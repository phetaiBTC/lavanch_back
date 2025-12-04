import { Permission } from 'src/modules/permission/domain/permission.entity';
import { PermissionResponse } from 'src/modules/permission/interface/permission.interface';

export interface RoleProps {
  id?: number | null;
  code: string;
  permissions: Permission[];
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export interface RoleResponse {
  id: number;
  code: string;
  permissions: PermissionResponse[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
