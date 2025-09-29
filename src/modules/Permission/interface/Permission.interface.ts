export interface PermissionProps{
    id?: number | null;
    code: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
}

export interface PermissionResponse{
    id: number;
    code: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
}