import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
import { User } from './User.entity';
import { PaginationDto } from 'src/shared/dto/pagination.dto';

export const User_REPOSITORY = Symbol('User_REPOSITORY'.toLocaleUpperCase());

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
