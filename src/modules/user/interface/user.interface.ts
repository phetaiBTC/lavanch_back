import { Permission } from 'src/modules/permission/domain/permission.entity';
import { PermissionResponse } from 'src/modules/permission/interface/permission.interface';
import { Role } from 'src/modules/role/domain/role.entity';
import { RoleResponse } from 'src/modules/role/interface/role.interface';

export interface UserProps {
  id?: number | null;
  username: string;
  email: string;
  password: string;
  is_verified: boolean;
  roles?: Role[];
  permission?: Permission[];
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export interface UserResponse {
  id: number;
  username: string;
  email: string;
  is_verified: boolean;
  roles: RoleResponse[];
  permissions: PermissionResponse[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
