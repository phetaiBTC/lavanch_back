import { PermissionProps } from '../interface/permission.interface';

export class Permission {
  private id: number | null;
  private code: string;
  private createdAt: Date;
  private updatedAt: Date;
  private deletedAt: Date | null;
  constructor(props: PermissionProps) {
    this.id = props.id ?? null;
    this.code = props.code;
    this.createdAt = props.createdAt ?? new Date();
    this.updatedAt = props.updatedAt ?? new Date();
    this.deletedAt = props.deletedAt ?? null;
  }

  get value() {
    return {
      id: this.id,
      code: this.code,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }
}
