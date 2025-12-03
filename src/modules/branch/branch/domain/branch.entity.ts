import { BranchProps } from '../interface/branch.interface';
import { Village } from 'src/modules/address/domain/address.entity';

export class Branch {
  private id?: number;
  private name: string;
  private address?: string;
  private village_id?: number;
  private village?: Village;
  private phone?: string;
  private facebook?: string;
  private tiktok?: string;
  private shifts_id?: number;
  private is_active: boolean;
  private wallet_balance: number;
  private createdAt: Date;
  private updatedAt: Date;
  private deletedAt: Date | null;

  constructor(props: BranchProps) {
    this.id = props.id;
    this.name = props.name;
    this.address = props.address;
    this.village_id = props.village_id;
    this.village = props.village;
    this.phone = props.phone;
    this.facebook = props.facebook;
    this.tiktok = props.tiktok;
    this.shifts_id = props.shifts_id;
    this.is_active = props.is_active ?? true;
    this.wallet_balance = props.wallet_balance ?? 0;
    this.createdAt = props.createdAt ?? new Date();
    this.updatedAt = props.updatedAt ?? new Date();
    this.deletedAt = props.deletedAt ?? null;
  }

  get value() {
    return {
      id: this.id,
      name: this.name,
      address: this.address,
      village_id: this.village_id,
      village: this.village,
      phone: this.phone,
      facebook: this.facebook,
      tiktok: this.tiktok,
      shifts_id: this.shifts_id,
      is_active: this.is_active,
      wallet_balance: this.wallet_balance,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }

  update(props: Partial<BranchProps>): Branch {
    return new Branch({
      ...this.value,
      ...props,
      updatedAt: new Date(),
    });
  }

  /**
   * Update wallet balance
   * @param newBalance - The new wallet balance
   */
  updateWalletBalance(newBalance: number): Branch {
    return new Branch({
      ...this.value,
      wallet_balance: newBalance,
      updatedAt: new Date(),
    });
  }
}
