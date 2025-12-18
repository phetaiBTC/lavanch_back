export const generateUpdateDto = (
  moduleName: string,
  capitalize: (str: string) => string,
): string => {
  const capitalizedName = capitalize(moduleName);
  return `
  import { IsNotEmpty, IsString } from 'class-validator';
  import { PartialType } from '@nestjs/mapped-types';
  import { Create${capitalizedName}Dto } from './create-${moduleName}.dto';
  export class Update${capitalizedName}Dto extends PartialType(Create${capitalizedName}Dto) {}`;
};
