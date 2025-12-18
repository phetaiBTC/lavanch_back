export const generateUpdateUseCase = (
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
import { FindOne${capitalizedName}UseCase } from '../queries/findOne-${moduleName}.usecase';

  import { Update${capitalizedName}Dto } from '../../dto/update-${moduleName}.dto';

  @Injectable()
  export class Update${capitalizedName}UseCase {
    constructor(
      @Inject(${moduleName.toUpperCase()}_REPOSITORY)
      private readonly ${moduleName}Repository: I${capitalizedName}Repository,
      private readonly ${moduleName}GetOne: FindOne${capitalizedName}UseCase,
    ) {}

    async execute(id: number, body: Update${capitalizedName}Dto): Promise<${capitalizedName}> {
      const ${moduleName} = await this.${moduleName}GetOne.execute(id);
      const update = ${moduleName}.update({
        name: body.name,
      });
      return await this.${moduleName}Repository.save(update);
    }
  }`;
};
