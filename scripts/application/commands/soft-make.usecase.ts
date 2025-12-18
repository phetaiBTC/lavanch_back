export const generateSoftDeleteUseCase = (moduleName: string, capitalize: (str: string) => string): string => {
  const capitalizedName = capitalize(moduleName);
  return `
import { Inject, Injectable } from '@nestjs/common';
  import {
    ${moduleName.toUpperCase()}_REPOSITORY,
    type I${capitalizedName}Repository,
  } from '../../domain/${moduleName}.repository';
import { FindOne${capitalizedName}UseCase } from '../queries/findOne-${capitalizedName}.usecase';


@Injectable()
export class SoftDelete${capitalizedName}UseCase {
  constructor(
      @Inject(${moduleName.toUpperCase()}_REPOSITORY)
      private readonly ${moduleName}Repository: I${capitalizedName}Repository,
      private readonly ${moduleName}GetOne: FindOne${capitalizedName}UseCase,
  ) {}

  async execute(id: number[]): Promise<{ message: string }> {
    await Promise.all(id.map((id) => this.${moduleName}GetOne.execute(id)));
    return await this.${moduleName}Repository.softDelete(id);
  }
}
  
  `;
};