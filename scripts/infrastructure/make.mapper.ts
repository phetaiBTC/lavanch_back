export const generateMapper = (
  moduleName: string,
  capitalize: (str: string) => string,
): string => {
  const capitalizedName = capitalize(moduleName);
  return `
  import { BaseMapper } from 'src/shared/BaseModule/infrastructure/base.mapper';
  import { ${capitalizedName}Response } from '../interface/${moduleName}.interface';
  import { ${capitalizedName}Orm } from 'src/database/typeorm/${moduleName}.orm-entity';
  import { ${capitalizedName} } from '../domain/${moduleName}.entity';
  class ${capitalizedName}MapperClass extends BaseMapper<${capitalizedName}, ${capitalizedName}Orm, ${capitalizedName}Response> {
    toDomain = (schema: ${capitalizedName}Orm): ${capitalizedName} => {
      return new ${capitalizedName}({
        id: schema.id,
        name: schema.name,
        ...this.getTimestampsFromSchema(schema),
      });
    };
    toSchema(domain: ${capitalizedName}): ${capitalizedName}Orm {
      const schema = new ${capitalizedName}Orm();
      if (domain.value.id != null) schema.id = domain.value.id;
      schema.name = domain.value.name;

      return schema;
    }
    toResponse(domain: ${capitalizedName}): ${capitalizedName}Response {
      return {
        id: domain.value.id!,
        name: domain.value.name,
        ...this.getFormattedTimestamps(domain),
      };
    }
  }

  export const ${capitalizedName}Mapper = new ${capitalizedName}MapperClass();
  
  `;
};
