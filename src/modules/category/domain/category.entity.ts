import { ShardEntity } from 'src/shared/BaseModule/domain/base.entity';
import { CategoryProps } from '../interface/category.interface';

export class Category extends ShardEntity<CategoryProps> {
  private name: string;
  private description?: string;
  private parent?: Category | null;
  private children: Category[];
  private is_active: boolean;

  constructor(props: CategoryProps) {
    super(props);
    this.name = props.name;
    this.description = props.description;
    this.parent = props.parent ?? null;
    this.children = props.children ?? [];
    this.is_active = props.is_active ?? true;
  }

  get value() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      parent: this.parent,
      children: this.children,
      is_active: this.is_active,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }

  update(
    props: Partial<
      Omit<CategoryProps, 'id' | 'createdAt' | 'deletedAt' | 'updatedAt'>
    >,
  ): Category {
    return new Category({
      ...this.value,
      ...props,
    });
  }
}
