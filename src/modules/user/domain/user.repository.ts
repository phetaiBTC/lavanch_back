import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
import { User } from './user.entity';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { IRemoveRepository } from 'src/shared/interface/removeRepository.interface';

export const USER_REPOSITORY = Symbol('USER_REPOSITORY');

export interface IUserRepository extends IRemoveRepository {
  findById(id: number): Promise<User | null>;
  findAll(query: PaginationDto): Promise<PaginatedResponse<User>>;
  findByEmail(email: string): Promise<User | null>;
  create(User: User): Promise<User>;
  update(User: User): Promise<User>;
}
