import { SupplierProps } from '../interface/suppliers.interface';

export class Supplier {
  readonly id?: number;
  private _name: string;
  private _phone: string;
  private _address: string;
  private _email: string;
  private _is_active: boolean;
  private _contact_person: string;
  private _vaillage_id?: number;

  constructor(props: SupplierProps) {
    this.id = props.id;
    this._name = props.name;
    this._phone = props.phone;
    this._address = props.address;
    this._email = props.email;
    this._is_active = props.is_active;
    this._contact_person = props.contact_person;
    this._vaillage_id = props.vaillage_id;
  }

  get name(): string {
    return this._name;
  }

  get phone(): string {
    return this._phone;
  }

  get address(): string {
    return this._address;
  }

  get email(): string {
    return this._email;
  }

  get is_active(): boolean {
    return this._is_active;
  }

  get contact_person(): string {
    return this._contact_person;
  }

  get vaillage_id(): number | undefined {
    return this._vaillage_id;
  }

  update(props: {
    name?: string;
    phone?: string;
    address?: string;
    email?: string;
    is_active?: boolean;
    contact_person?: string;
    vaillage_id?: number;
  }) {
    if (props.name !== undefined) this._name = props.name;
    if (props.phone !== undefined) this._phone = props.phone;
    if (props.address !== undefined) this._address = props.address;
    if (props.email !== undefined) this._email = props.email;
    if (props.is_active !== undefined) this._is_active = props.is_active;
    if (props.contact_person !== undefined)
      this._contact_person = props.contact_person;
    if (props.vaillage_id !== undefined) this._vaillage_id = props.vaillage_id;
  }
}
