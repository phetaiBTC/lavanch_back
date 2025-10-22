import { User } from './user.entity';
import { IBaseRepository } from 'src/shared/BaseModule/domain/base.repository';

export const USER_REPOSITORY = Symbol('USER_REPOSITORY');

export interface IUserRepository extends IBaseRepository<User> {
  findByEmail(email: string): Promise<User | null>;
}
