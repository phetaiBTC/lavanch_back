import { ImageProps } from '../interface/images.interface';

export class Images {
  private id?: number;
  private url: string;
  private key: string;
  private createdAt: Date;
  private updatedAt: Date;
  private deletedAt: Date | null;
  constructor(props: ImageProps) {
    this.id = props.id;
    this.url = props.url;
    this.key = props.key;
    this.createdAt = props.createdAt ?? new Date();
    this.updatedAt = props.updatedAt ?? new Date();
    this.deletedAt = props.deletedAt ?? null;
  }

  get value() {
    return {
      id: this.id,
      url: this.url,
      key: this.key,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }
}
