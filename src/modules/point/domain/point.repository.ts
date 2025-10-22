import { Point } from './point.entity';
import { PointNameCode } from 'src/shared/enum/point-name-code';
import { IBaseRepository } from 'src/shared/BaseModule/domain/base.repository';
export const POINT_REPOSITORY = Symbol('POINT_REPOSITORY');
export interface IPointRepository extends IBaseRepository<Point> {
  findByName(name: string): Promise<Point | null>;
  findByNameCode(name_code: PointNameCode): Promise<Point | null>;
}
