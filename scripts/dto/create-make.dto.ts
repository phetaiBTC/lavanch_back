export const generateCreateDto = (
  moduleName: string,
  capitalize: (str: string) => string,
): string => {
  const capitalizedName = capitalize(moduleName);
  return `
  import { IsNotEmpty, IsString } from 'class-validator';
  export class Create${capitalizedName}Dto {
    @IsString()
  @IsNotEmpty()
  name: string;
}`;
};
