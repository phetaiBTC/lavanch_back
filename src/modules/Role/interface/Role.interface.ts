import { Permission } from "src/modules/Permission/domain/Permission.entity";
import { PermissionResponse } from "src/modules/Permission/interface/Permission.interface";

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