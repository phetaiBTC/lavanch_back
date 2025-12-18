export const generateCreateUseCase = (
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
  import { Create${capitalizedName}Dto } from '../../dto/create-${moduleName}.dto';
  import { ${capitalizedName} } from '../../domain/${moduleName}.entity';

  @Injectable()
  export class Create${capitalizedName}UseCase {
    constructor(
      @Inject(${moduleName.toUpperCase()}_REPOSITORY)
      private readonly ${moduleName}Repository: I${capitalizedName}Repository,
    ) {}

    async execute(body: Create${capitalizedName}Dto): Promise<${capitalizedName}> {
      const ${moduleName} = new ${capitalizedName}({
        name: body.name,
      });
      return await this.${moduleName}Repository.save(${moduleName});
    }
  }
`;
};
