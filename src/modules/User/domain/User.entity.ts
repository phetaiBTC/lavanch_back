import { comparePassword, hashPassword } from 'src/shared/utils/bcrypt.util';
import { UserProps } from '../interface/User.interface';

export class User {
  private id: number | null;
  private username: string;
  private email: string;
  private password: string;
  private is_verified: boolean;
  private createdAt: Date;
  private updatedAt: Date;
  private deletedAt: Date | null;

  constructor(props: UserProps) {
    this.id = props.id ?? null;
    this.username = props.username;
    this.email = props.email;
    this.password = props.password;
    this.is_verified = props.is_verified;
    this.createdAt = props.createdAt ?? new Date();
    this.updatedAt = props.updatedAt ?? new Date();
    this.deletedAt = props.deletedAt ?? null;
  }

  get value() {
    return {
      id: this.id,
      username: this.username,
      email: this.email,
      password: this.password,
      is_verified: this.is_verified,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }

  verify(): void {
    this.is_verified = true;
  }

  async compare(password: string): Promise<boolean> {
    return await comparePassword(password, this.password);
  }

  changeUsername(newUsername: string) {
    this.username = newUsername;
  }

  async changePassword(newPassword: string) {
    this.password = await hashPassword(newPassword);
  }
}
