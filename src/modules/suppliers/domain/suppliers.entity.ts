import { ShardEntity } from 'src/shared/BaseModule/domain/base.entity';
import { SuppliersProps } from '../interface/suppliers.interface';
import { Village } from 'src/modules/address/domain/address.entity';
export class Suppliers extends ShardEntity<SuppliersProps> {
  private name: string;
  private email: string;
  private phone: string;
  private contact_person: string;
  private address: string;
  private is_active: boolean;
  private village?: Village;
  constructor(props: SuppliersProps) {
    super(props);
    this.name = props.name;
    this.email = props.email;
    this.phone = props.phone;
    this.contact_person = props.contact_person;
    this.address = props.address;
    this.is_active = props.is_active;
    this.village = props.village;
  }

  get value() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      phone: this.phone,
      contact_person: this.contact_person,
      address: this.address,
      is_active: this.is_active,
      village: this.village,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }

  update(
    props: Partial<
      Omit<SuppliersProps, 'id' | 'createdAt' | 'deletedAt' | 'updatedAt'>
    >,
  ): Suppliers {
    return new Suppliers({
      ...this.value,
      ...props,
    });
  }
}
