import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
import { User } from './user.entity';
import { PaginationDto } from 'src/shared/dto/pagination.dto';

export const USER_REPOSITORY = Symbol('USER_REPOSITORY');

export interface IUserRepository {
  findById(id: number): Promise<User | null>;
  findAll(query:PaginationDto): Promise<PaginatedResponse<User>>;
  findByEmail(email:string):Promise<User|null>
  create(User: User): Promise<User>;
  update(User: User): Promise<User>;
  hardDelete(id: number): Promise<{ message: string }>;
  softDelete(id: number): Promise<{ message: string }>;
  restore(id: number): Promise<{ message: string }>;
}
