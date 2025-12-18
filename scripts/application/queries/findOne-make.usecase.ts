
export const generateGetOneUseCase = (moduleName: string, capitalize: (str: string) => string): string => {
  const capitalizedName = capitalize(moduleName);
  return `
  import { Inject, Injectable,NotFoundException } from '@nestjs/common';
  import {
    ${moduleName.toUpperCase()}_REPOSITORY,
    type I${capitalizedName}Repository,
  } from '../../domain/${moduleName}.repository';
  import { ${capitalizedName} } from '../../domain/${moduleName}.entity';

@Injectable()
export class FindOne${capitalizedName}UseCase {
  constructor(
 @Inject(${moduleName.toUpperCase()}_REPOSITORY)
      private readonly ${moduleName}Repository: I${capitalizedName}Repository,
  ) {}

  async execute(id: number): Promise<${capitalizedName}> {
    const ${moduleName} = await this.${moduleName}Repository.findById(id);
    if (!${moduleName}) {
      throw new NotFoundException('${capitalizedName} not found');
    }
    return ${moduleName};
  }
}
  
  `;
};