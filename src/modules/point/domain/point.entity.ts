import { ShardEntity } from "src/shared/entity/base.entity";
import { PointNameCode } from "src/shared/enum/point-name-code";
import { PointProps } from "../interface/point.interface";

export class Point extends ShardEntity<PointProps> {
  name: string;
  points_multiplier: number;
  name_code: PointNameCode;

  constructor(props: PointProps) {
    super(props);
    this.name = props.name;
    this.points_multiplier = props.points_multiplier ?? 1.0;
    this.name_code = props.name_code;
  }

  get value() {
    return {
      id: this.id,
      name: this.name,
      points_multiplier: this.points_multiplier,
      name_code: this.name_code,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }
}