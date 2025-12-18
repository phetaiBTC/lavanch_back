export const generateRepositoryImpl = (
  moduleName: string,
  capitalize: (str: string) => string,
): string => {
  const capitalizedName = capitalize(moduleName);
  return `

import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ${capitalizedName}Orm } from 'src/database/typeorm/${moduleName}.orm-entity';
import { ${capitalizedName}Response } from '../interface/${moduleName}.interface';
import { ${capitalizedName} from '../domain/${moduleName}.entity';
import { I${capitalizedName}Repository } from '../domain/${moduleName}.repository';
import { ${capitalizedName}Mapper } from './${moduleName}.mapper';
import { SelectQueryBuilder } from 'typeorm/browser';
import { BaseRepository } from 'src/shared/BaseModule/infrastructure/base.repository.impl';

@Injectable()
export class ${capitalizedName}RepositoryImpl
  extends BaseRepository<${capitalizedName}, ${capitalizedName}Orm, ${capitalizedName}Response>
  implements I${capitalizedName}Repository
{
  constructor(
    @InjectRepository(${capitalizedName}Orm)
    protected readonly repo: Repository<${capitalizedName}Orm>,
  ) {
    super({
      repository: repo,
      mapper: ${capitalizedName}Mapper,
      searchField: 'name',
    });
  }
  createQueryBuilder(): SelectQueryBuilder<TagOrm> {
    return this.repo.createQueryBuilder('${moduleName}');
  }
}
`;
};
