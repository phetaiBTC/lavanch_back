import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  ROLE_REPOSITORY,
  type IRoleRepository,
} from '../../domain/role.repository';
import { GetOneRoleUseCase } from '../queries/getOne-Role.usecase';

@Injectable()
export class RestoreRoleUseCase {
  constructor(
    @Inject(ROLE_REPOSITORY)
    private readonly permissionRepository: IRoleRepository,
    private readonly getOneRoleUseCase: GetOneRoleUseCase,
  ) {}

  async execute(id: number[]): Promise<{ message: string }> {
    await Promise.all(id.map((id) => this.getOneRoleUseCase.execute(id)));
    return await this.permissionRepository.restore(id);
  }
}
