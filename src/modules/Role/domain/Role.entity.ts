import { Permission } from 'src/modules/Permission/domain/Permission.entity';
import { RoleProps } from '../interface/Role.interface';

export class Role {
  private id: number | null;
  private code: string;
  private permissions: Permission[];
  private createdAt: Date;
  private updatedAt: Date;
  private deletedAt: Date | null;
  constructor(props: RoleProps) {
    this.id = props.id ?? null;
    this.code = props.code;
    this.permissions = props.permissions;
    this.createdAt = props.createdAt ?? new Date();
    this.updatedAt = props.updatedAt ?? new Date();
    this.deletedAt = props.deletedAt ?? null;
  }

  get value() {
    return {
      id: this.id,
      code: this.code,
      permissions: this.permissions,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }

  set(props: RoleProps) {
    this.code = props.code;
    this.permissions = props.permissions;
  }
}
