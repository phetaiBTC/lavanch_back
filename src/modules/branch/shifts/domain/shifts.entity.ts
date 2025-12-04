import { ShiftsProps } from '../interface/shifts.interface';

export class Shifts {
  private id?: number;
  private start_time: string;
  private end_time: string;
  private createdAt: Date;
  private updatedAt: Date;
  private deletedAt: Date | null;

  constructor(props: ShiftsProps) {
    this.id = props.id;
    this.start_time = props.start_time;
    this.end_time = props.end_time;
    this.createdAt = props.createdAt ?? new Date();
    this.updatedAt = props.updatedAt ?? new Date();
    this.deletedAt = props.deletedAt ?? null;
  }

  get value() {
    return {
      id: this.id,
      start_time: this.start_time,
      end_time: this.end_time,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }

  update(props: Partial<ShiftsProps>): Shifts {
    return new Shifts({
      ...this.value,
      ...props,
      updatedAt: new Date(),
    });
  }
}
