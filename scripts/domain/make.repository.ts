export const generateRepository = (
  moduleName: string,
  capitalize: (str: string) => string,
): string => {
  const capitalizedName = capitalize(moduleName);
  return `import { ${capitalizedName} } from './${moduleName}.entity';
export const ${moduleName.toUpperCase()}_REPOSITORY = Symbol('${moduleName.toUpperCase()}_REPOSITORY');
export interface I${capitalizedName}Repository extends IBaseRepository<${capitalizedName}> {}`;
};
