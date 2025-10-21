import { PaginatedResponse } from 'src/shared/interface/pagination.interface';import { Point } from './point.entity';import { PaginationDto } from 'src/shared/dto/pagination.dto';import { IRemoveRepository } from 'src/shared/interface/removeRepository.interface';
import { PointNameCode } from 'src/shared/enum/point-name-code';
export const POINT_REPOSITORY = Symbol('POINT_REPOSITORY');
export interface IPointRepository extends IRemoveRepository {
findAll(query: PaginationDto): Promise<PaginatedResponse<Point>>;
findById(id: number): Promise<Point | null>;
create(point: Point): Promise<Point>;
update(point: Point): Promise<Point>;
findByName(name: string): Promise<Point | null>;
findByNameCode(name_code: PointNameCode): Promise<Point | null>;}