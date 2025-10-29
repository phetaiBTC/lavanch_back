import { UnitProps } from '../interface/unit.interface';
import { ShardEntity } from 'src/shared/BaseModule/domain/base.entity';

export class Unit extends ShardEntity<UnitProps> {
  name: string;
  name_en?: string;
  abbreviation?: string;
  is_active: boolean;

  constructor(props: UnitProps) {
    super(props);
    this.name = props.name;
    this.name_en = props.name_en;
    this.abbreviation = props.abbreviation;
    this.is_active = props.is_active ?? true;
  }

  get value() {
    return {
      id: this.id,
      name: this.name,
      name_en: this.name_en,
      abbreviation: this.abbreviation,
      is_active: this.is_active,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }

  update (
    props: Partial<
      Omit<UnitProps, 'id' | 'createdAt' | 'deletedAt' | 'updatedAt'>
    >,
  ) {
    return new Unit({
      ...this.value,
      ...props,
    });
  }
}

