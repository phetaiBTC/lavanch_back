import { Permission } from 'src/modules/Permission/domain/Permission.entity';
import { PermissionResponse } from 'src/modules/Permission/interface/Permission.interface';
import { Role } from 'src/modules/Role/domain/Role.entity';
import { RoleResponse } from 'src/modules/Role/interface/Role.interface';

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
