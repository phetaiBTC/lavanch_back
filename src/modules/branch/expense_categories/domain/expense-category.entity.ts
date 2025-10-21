import { ExpenseCategoryProps } from '../interface/expense-category.interface';

export class ExpenseCategory {
  private id?: number;
  private name: string;
  private code?: string;
  private description?: string;
  private is_active: boolean;
  private createdAt: Date;
  private updatedAt: Date;
  private deletedAt: Date | null;

  constructor(props: ExpenseCategoryProps) {
    this.id = props.id;
    this.name = props.name;
    this.code = props.code;
    this.description = props.description;
    this.is_active = props.is_active ?? true;
    this.createdAt = props.createdAt ?? new Date();
    this.updatedAt = props.updatedAt ?? new Date();
    this.deletedAt = props.deletedAt ?? null;
  }

  get value() {
    return {
      id: this.id,
      name: this.name,
      code: this.code,
      description: this.description,
      is_active: this.is_active,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }

  update(props: Partial<ExpenseCategoryProps>): ExpenseCategory {
    return new ExpenseCategory({
      ...this.value,
      ...props,
      updatedAt: new Date(),
    });
  }
}
