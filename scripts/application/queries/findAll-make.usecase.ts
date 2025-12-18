export const generateGetUseCase = (
  moduleName: string,
  capitalize: (str: string) => string,
): string => {
  const capitalizedName = capitalize(moduleName);
  return `
  
  import { Inject, Injectable } from '@nestjs/common';
  import {
    ${moduleName.toUpperCase()}_REPOSITORY,
    type I${capitalizedName}Repository,
  } from '../../domain/${moduleName}.repository';
  import { ${capitalizedName} } from '../../domain/${moduleName}.entity';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';

@Injectable()
export class Find${capitalizedName}UseCase {
  constructor(
 @Inject(${moduleName.toUpperCase()}_REPOSITORY)
      private readonly ${moduleName}Repository: I${capitalizedName}Repository,
  ) {}

  async execute(query: PaginationDto): Promise<PaginatedResponse<${capitalizedName}>> {
    return await this.${moduleName}Repository.findAll(query);
  }
}
  
  `;
};
