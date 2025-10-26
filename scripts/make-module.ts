import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question: string): Promise<string> {
  return new Promise((resolve) => rl.question(question, resolve));
}

function toPascalCase(str: string): string {
  return str
    .split(/[-_]/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join('');
}

function toCamelCase(str: string): string {
  const pascal = toPascalCase(str);
  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
}

function toKebabCase(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

function createDirectory(dirPath: string): void {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`✅ Created directory: ${dirPath}`);
  }
}

function createFile(filePath: string, content: string): void {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Created file: ${filePath}`);
  }
}

// Template generator for Domain Entity
function generateEntity(
  name: string,
  pascalName: string,
  camelName: string,
): string {
  return `import { ShardEntity } from 'src/shared/BaseModule/domain/base.entity';
import { ${pascalName}Props } from '../interface/${name}.interface';
export class ${pascalName} extends ShardEntity<${pascalName}Props> {
  private name: string;
  constructor(props: ${pascalName}Props) {
    super(props);
    this.name = props.name;
  }

  get value() {
    return {
      id: this.id,
      name: this.name,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }

  update(
    props: Partial<
      Omit<${pascalName}Props, 'id' | 'createdAt' | 'deletedAt' | 'updatedAt'>
    >,
  ): ${pascalName} {
    return new ${pascalName}({
      ...this.value,
      ...props,
    });
  }
}
`;
}

function generateRepository(pascalName: string, camelName: string): string {
  const upperSnake = pascalName.toUpperCase();
  return `
import { IBaseRepository } from 'src/shared/BaseModule/domain/base.repository';
import { ${pascalName} } from './${camelName}.entity';

export const ${upperSnake}_REPOSITORY = Symbol('${upperSnake}_REPOSITORY');

export interface I${pascalName}Repository extends IBaseRepository<${pascalName}> {
}
`;
}

function generateRepositoryImpl(
  name: string,
  pascalName: string,
  camelName: string,
): string {
  const upperSnake = pascalName.toUpperCase();
  return `import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { I${pascalName}Repository } from '../domain/${camelName}.repository';
import { ${pascalName}Orm } from 'src/database/typeorm/${name}.orm-entity';
import { BaseRepository } from 'src/shared/BaseModule/infrastructure/base.repository.impl';
import { ${pascalName} } from '../domain/${camelName}.entity';
import { ${pascalName}Mapper } from './${camelName}.mapper';
@Injectable()
export class ${pascalName}RepositoryImpl
  extends BaseRepository<${pascalName}, ${pascalName}Orm, any>
  implements I${pascalName}Repository
{
  constructor(
    @InjectRepository(${pascalName}Orm)
    protected readonly ${camelName}Repo: Repository<${pascalName}Orm>,
  ) {
    super(${camelName}Repo, ${pascalName}Mapper, '${name}', 'name');
  }

  async findByName(name: string): Promise<${pascalName} | null> {
    return this.findByField('name', name);
  }
}
`;
}

function generateMapper(pascalName: string, camelName: string): string {
  return `
import { ${pascalName}Response } from '../interface/${camelName}.interface';
import { ${pascalName}Orm } from 'src/database/typeorm/${camelName}.orm-entity';
import { BaseMapper } from 'src/shared/BaseModule/infrastructure/base.mapper';
import { ${pascalName} } from '../domain/${camelName}.entity';
class ${pascalName}MapperClass extends BaseMapper<${pascalName}, ${pascalName}Orm, ${pascalName}Response> {
  toDomain = (schema: ${pascalName}Orm): ${pascalName} => {
    return new ${pascalName}({
          id: schema.id,
      name: schema.name,
      ...this.getTimestampsFromSchema(schema),
    });
  };

  toSchema = (domain: ${pascalName}): ${pascalName}Orm => {
    const schema = new ${pascalName}Orm();

    if (domain.value.id != null) schema.id = domain.value.id;
    if (domain.value.name != null) schema.name = domain.value.name;

    return schema;
  };

  toResponse = (domain: ${pascalName}): ${pascalName}Response => {
    return {
          id: domain.value.id!,
      name: domain.value.name,
      ...this.getFormattedTimestamps(domain),
    };
  };
}

export const ${pascalName}Mapper = new ${pascalName}MapperClass();
`;
}

function generateInterface(pascalName: string): string {
  return `import { ShardInterfaceProps, ShardInterfaceResponse } from 'src/shared/BaseModule/interface/Base.interface';
export interface ${pascalName}Props extends ShardInterfaceProps {
    name: string;
}

export interface ${pascalName}Response extends ShardInterfaceResponse {
    name: string;
}
`;
}

function generateCreateDTO(pascalName: string): string {
  return `import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class Create${pascalName}Dto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  name: string;
}
`;
}

function generateUpdateDTO(pascalName: string): string {
  return `import { IsOptional, IsString, MaxLength } from 'class-validator';

export class Update${pascalName}Dto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  name?: string;
}
`;
}

function generateCreateUseCase(pascalName: string, camelName: string): string {
  const upperSnake = pascalName.toUpperCase();
  return `import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ${upperSnake}_REPOSITORY, type I${pascalName}Repository } from '../../domain/${camelName}.repository';

import { Create${pascalName}Dto } from '../../dto/create-${pascalName}.dto';
import { ${pascalName} } from '../../domain/${camelName}.entity';
@Injectable()
export class Create${pascalName}UseCase {
  constructor(
    @Inject(${upperSnake}_REPOSITORY)
    private readonly ${camelName}Repo: I${pascalName}Repository,
  ) {}

  async execute(dto: Create${pascalName}Dto): Promise<${pascalName}> {
    return this.${camelName}Repo.save(
      new ${pascalName}({
        ...dto,
      }),
    );
  }
}
`;
}

function generateUpdateUseCase(pascalName: string, camelName: string): string {
  const upperSnake = pascalName.toUpperCase();
  return `import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ${upperSnake}_REPOSITORY, type I${pascalName}Repository } from '../../domain/${camelName}.repository';

import { Update${pascalName}Dto } from '../../dto/update-${pascalName}.dto';
import { ${pascalName} } from '../../domain/${camelName}.entity';
@Injectable()
export class Update${pascalName}UseCase {
  constructor(
    @Inject(${upperSnake}_REPOSITORY)
    private readonly ${camelName}Repo: I${pascalName}Repository,
  ) {}

  async execute(id: string, dto: Update${pascalName}Dto): Promise<${pascalName}> {
    
    return this.${camelName}Repo.save(entity);
  }
}
`;
}

function generateSoftDeleteUseCase(
  pascalName: string,
  camelName: string,
): string {
  const upperSnake = pascalName.toUpperCase();
  return `import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ${upperSnake}_REPOSITORY, type I${pascalName}Repository } from '../../domain/${camelName}.repository';
import { FindOne${pascalName}UseCase } from '../queries/findOne-${pascalName}.usecase';

@Injectable()
export class SoftDelete${pascalName}UseCase {
  constructor(
    @Inject(${upperSnake}_REPOSITORY)
    private readonly ${camelName}Repo: I${pascalName}Repository,
    private readonly usecaseFindOne: FindOne${pascalName}UseCase,
  ) {}

  async execute(id: number): Promise<{ message: string }> {
    const entity = await this.usecaseFindOne.execute(id);
    await this.${camelName}Repo.softDelete(id);
    return { message: '${pascalName} deleted successfully' };
  }
}
`;
}

function generateHardDeleteUseCase(
  pascalName: string,
  camelName: string,
): string {
  const upperSnake = pascalName.toUpperCase();
  return `import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ${upperSnake}_REPOSITORY, type I${pascalName}Repository } from '../../domain/${camelName}.repository';
import { FindOne${pascalName}UseCase } from '../queries/findOne-${pascalName}.usecase';
@Injectable()
export class HardDelete${pascalName}UseCase {
  constructor(
    @Inject(${upperSnake}_REPOSITORY)
    private readonly ${camelName}Repo: I${pascalName}Repository,
    private readonly usecaseFindOne: FindOne${pascalName}UseCase,
  ) {}

  async execute(id: number): Promise<{ message: string }> {
    const entity = await this.usecaseFindOne.execute(id);

    await this.${camelName}Repo.hardDelete(id);
    return { message: '${pascalName} deleted successfully' };
  }
}
`;
}

function generateRestoreUseCase(pascalName: string, camelName: string): string {
  const upperSnake = pascalName.toUpperCase();
  return `import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ${upperSnake}_REPOSITORY, type I${pascalName}Repository } from '../../domain/${camelName}.repository';
import { FindOne${pascalName}UseCase } from '../queries/findOne-${pascalName}.usecase';
@Injectable()
export class Restore${pascalName}UseCase {
  constructor(
    @Inject(${upperSnake}_REPOSITORY)
    private readonly ${camelName}Repo: I${pascalName}Repository,
    private readonly usecaseFindOne: FindOne${pascalName}UseCase,
  ) {}

  async execute(id: number): Promise<{ message: string }> {
    const entity = await this.usecaseFindOne.execute(id);
    await this.${camelName}Repo.restore(id);
    return { message: '${pascalName} restored successfully' };
  }
}
`;
}

function generateFindUseCase(pascalName: string, camelName: string): string {
  const upperSnake = pascalName.toUpperCase();
  return `import { Inject, Injectable } from '@nestjs/common';
import { ${upperSnake}_REPOSITORY, type I${pascalName}Repository } from '../../domain/${camelName}.repository';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
import { ${pascalName} } from '../../domain/${camelName}.entity';

@Injectable()
export class FindAll${pascalName}UseCase {
  constructor(
    @Inject(${upperSnake}_REPOSITORY)
    private readonly ${camelName}Repo: I${pascalName}Repository,
  ) {}

  async execute(query: PaginationDto): Promise<PaginatedResponse<${pascalName}>> {
    return this.${camelName}Repo.findAll(query);
  }
}
`;
}

function generateFindOneUseCase(pascalName: string, camelName: string): string {
  const upperSnake = pascalName.toUpperCase();
  return `import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ${upperSnake}_REPOSITORY, type I${pascalName}Repository } from '../../domain/${camelName}.repository';
import { ${pascalName} } from '../../domain/${camelName}.entity';
@Injectable()
export class FindOne${pascalName}UseCase {
  constructor(
    @Inject(${upperSnake}_REPOSITORY)
    private readonly ${camelName}Repo: I${pascalName}Repository,
  ) {}

  async execute(id: number): Promise<${pascalName}> {
    const entity = await this.${camelName}Repo.findById(id);
    if (!entity) throw new NotFoundException('${pascalName} not found');
    return entity;
  }
}
`;
}

function generateController(
  pascalName: string,
  camelName: string,
  pluralName: string,
): string {
  const lowerName = camelName.toLowerCase();
  return `import { Body, Controller, Param, Patch } from '@nestjs/common';
import { ${pascalName} } from './domain/${camelName}.entity';
import { ${pascalName}Orm } from 'src/database/typeorm/${camelName}.orm-entity';
import { ${pascalName}Response } from './interface/${camelName}.interface';
import { Create${pascalName}Dto } from './dto/create-${pascalName}.dto';
import { Update${pascalName}Dto } from './dto/update-${pascalName}.dto';
import { ${pascalName}Mapper } from './infrastructure/${camelName}.mapper';
import { Create${pascalName}UseCase } from './application/commands/create-${pascalName}.usecase';
import { Update${pascalName}UseCase } from './application/commands/update-${pascalName}.usecase';
import { FindOne${pascalName}UseCase } from './application/queries/findOne-${pascalName}.usecase';
import { FindAll${pascalName}UseCase } from './application/queries/find-${pascalName}.usecase';
import { HardDelete${pascalName}UseCase } from './application/commands/hard-${pascalName}.usecase';
import { SoftDelete${pascalName}UseCase } from './application/commands/soft-${pascalName}.usecase';
import { Restore${pascalName}UseCase } from './application/commands/restore-${pascalName}.usecase';
import { BaseController } from 'src/shared/BaseModule/BaseController';

@Controller('${lowerName}')
export class ${pascalName}Controller extends BaseController<
  ${pascalName},
  ${pascalName}Orm,
  ${pascalName}Response,
  Create${pascalName}Dto,
  Update${pascalName}Dto
> {
  constructor(
    create${pascalName}UseCase: Create${pascalName}UseCase,
    update${pascalName}UseCase: Update${pascalName}UseCase,
    findOne${pascalName}UseCase: FindOne${pascalName}UseCase,
    findAll${pascalName}UseCase: FindAll${pascalName}UseCase,
    hardDelete${pascalName}UseCase: HardDelete${pascalName}UseCase,
    softDelete${pascalName}UseCase: SoftDelete${pascalName}UseCase,
    restore${pascalName}UseCase: Restore${pascalName}UseCase,
    private readonly updateActive${pascalName}UseCase?: any, // optional custom usecase
  ) {
    super(
      ${pascalName}Mapper,
      create${pascalName}UseCase,
      update${pascalName}UseCase,
      findOne${pascalName}UseCase,
      findAll${pascalName}UseCase,
      hardDelete${pascalName}UseCase,
      softDelete${pascalName}UseCase,
      restore${pascalName}UseCase,
    );
  }

  // custom endpoint สำหรับ active update (ถ้ามี)
  @Patch('active-update/:id')
  async activeUpdate(
    @Param('id') id: number,
    @Body() dto: any,
  ): Promise<${pascalName}Response> {
    if (!this.updateActive${pascalName}UseCase) {
      throw new Error('UpdateActiveUseCase not provided');
    }
    return ${pascalName}Mapper.toResponse(
      await this.updateActive${pascalName}UseCase.execute(id, dto),
    );
  }
}
`;
}

function generateModule(
  pascalName: string,
  camelName: string,
  pluralName: string,
): string {
  const upperName = pascalName.toUpperCase();
  const lowerName = camelName.toLowerCase();

  return `import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ${pascalName}RepositoryImpl } from './infrastructure/${camelName}.repository.impl';
import { ${pascalName}Controller } from './${camelName}.controller';
import { ${upperName}_REPOSITORY } from './domain/${camelName}.repository';
import { Create${pascalName}UseCase } from './application/commands/create-${pascalName}.usecase';
import { Update${pascalName}UseCase } from './application/commands/update-${pascalName}.usecase';
import { HardDelete${pascalName}UseCase } from './application/commands/hard-${pascalName}.usecase';
import { SoftDelete${pascalName}UseCase } from './application/commands/soft-${pascalName}.usecase';
import { Restore${pascalName}UseCase } from './application/commands/restore-${pascalName}.usecase';
import { FindOne${pascalName}UseCase } from './application/queries/findOne-${pascalName}.usecase';
import { FindAll${pascalName}UseCase } from './application/queries/find-${pascalName}.usecase';
import { ${pascalName}Orm } from 'src/database/typeorm/${camelName}.orm-entity';
import { UpdateActive${pascalName}UseCase } from './application/commands/ีactive-${pascalName}.usecase';
import { UniqueValidatorService } from 'src/shared/utils/pass.notfound.util';
import { FindName${pascalName}UseCase } from './application/queries/findName-${pascalName}.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([${pascalName}Orm])],
  controllers: [${pascalName}Controller],
  providers: [
    { provide: ${upperName}_REPOSITORY, useClass: ${pascalName}RepositoryImpl },
    Create${pascalName}UseCase,
    Update${pascalName}UseCase,
    HardDelete${pascalName}UseCase,
    SoftDelete${pascalName}UseCase,
    Restore${pascalName}UseCase,
    FindOne${pascalName}UseCase,
    FindAll${pascalName}UseCase,
    UpdateActive${pascalName}UseCase,
    FindName${pascalName}UseCase,
    UniqueValidatorService
  ],
  exports: [
    { provide: ${upperName}_REPOSITORY, useClass: ${pascalName}RepositoryImpl },
    Create${pascalName}UseCase,
    Update${pascalName}UseCase,
    HardDelete${pascalName}UseCase,
    SoftDelete${pascalName}UseCase,
    Restore${pascalName}UseCase,
    FindOne${pascalName}UseCase,
    FindAll${pascalName}UseCase,
    UpdateActive${pascalName}UseCase,
    FindName${pascalName}UseCase,
    UniqueValidatorService
  ]
})
export class ${pascalName}Module {}
`;
}

async function generateModules(): Promise<void> {
  console.log('🚀 NestJS Clean Architecture Module Generator\n');

  const moduleName = await ask(
    'Enter module name (e.g., product_point or ProductPoint): ',
  );

  if (!moduleName) {
    console.log('❌ Module name is required!');
    rl.close();
    return;
  }

  const name = toKebabCase(moduleName).replace(/-/g, '_');
  const pascalName = toPascalCase(moduleName);
  const camelName = toCamelCase(moduleName);

  console.log(`\n📝 Generating module with:`);
  console.log(`   - Snake case: ${name}`);
  console.log(`   - Pascal case: ${pascalName}`);
  console.log(`   - Camel case: ${camelName}\n`);

  const basePath = path.join(process.cwd(), 'src', 'modules', name);

  // Create directories
  createDirectory(basePath);
  createDirectory(path.join(basePath, 'application', 'commands'));
  createDirectory(path.join(basePath, 'application', 'queries'));
  createDirectory(path.join(basePath, 'domain'));
  createDirectory(path.join(basePath, 'dto'));
  createDirectory(path.join(basePath, 'infrastructure'));
  createDirectory(path.join(basePath, 'interface'));

  // Generate domain files
  createFile(
    path.join(basePath, 'domain', `${camelName}.entity.ts`),
    generateEntity(name, pascalName, camelName),
  );
  createFile(
    path.join(basePath, 'domain', `${camelName}.repository.ts`),
    generateRepository(pascalName, camelName),
  );

  // Generate infrastructure files
  createFile(
    path.join(basePath, 'infrastructure', `${camelName}.repository.impl.ts`),
    generateRepositoryImpl(name, pascalName, camelName),
  );
  createFile(
    path.join(basePath, 'infrastructure', `${camelName}.mapper.ts`),
    generateMapper(pascalName, camelName),
  );

  // Generate interface
  createFile(
    path.join(basePath, 'interface', `${camelName}.interface.ts`),
    generateInterface(pascalName),
  );

  // Generate DTOs
  createFile(
    path.join(basePath, 'dto', `create-${pascalName}.dto.ts`),
    generateCreateDTO(pascalName),
  );
  createFile(
    path.join(basePath, 'dto', `update-${pascalName}.dto.ts`),
    generateUpdateDTO(pascalName),
  );

  // Generate command use cases
  createFile(
    path.join(
      basePath,
      'application',
      'commands',
      `create-${pascalName}.usecase.ts`,
    ),
    generateCreateUseCase(pascalName, camelName),
  );
  createFile(
    path.join(
      basePath,
      'application',
      'commands',
      `update-${pascalName}.usecase.ts`,
    ),
    generateUpdateUseCase(pascalName, camelName),
  );
  createFile(
    path.join(
      basePath,
      'application',
      'commands',
      `soft-${pascalName}.usecase.ts`,
    ),
    generateSoftDeleteUseCase(pascalName, camelName),
  );
  createFile(
    path.join(
      basePath,
      'application',
      'commands',
      `hard-${pascalName}.usecase.ts`,
    ),
    generateHardDeleteUseCase(pascalName, camelName),
  );
  createFile(
    path.join(
      basePath,
      'application',
      'commands',
      `restore-${pascalName}.usecase.ts`,
    ),
    generateRestoreUseCase(pascalName, camelName),
  );

  // Generate query use cases
  createFile(
    path.join(
      basePath,
      'application',
      'queries',
      `find-${pascalName}.usecase.ts`,
    ),
    generateFindUseCase(pascalName, camelName),
  );
  createFile(
    path.join(
      basePath,
      'application',
      'queries',
      `findOne-${pascalName}.usecase.ts`,
    ),
    generateFindOneUseCase(pascalName, camelName),
  );

  // Generate controller and module
  createFile(
    path.join(basePath, `${camelName}.controller.ts`),
    generateController(name, pascalName, camelName),
  );
  createFile(
    path.join(basePath, `${camelName}.module.ts`),
    generateModule(name, pascalName, camelName),
  );

  console.log(`\n✨ Module "${pascalName}" generated successfully!`);
  console.log(`\n📁 Location: ${basePath}`);
  console.log(`\n⚠️  Don't forget to:`);
  console.log(`   1. Add ${pascalName}Module to your app.module.ts imports`);
  console.log(`   2. Run database migrations if needed`);
  console.log(`   3. Customize the entity fields according to your needs\n`);

  rl.close();
}

generateModules().catch((error) => {
  console.error('❌ Error:', error);
  rl.close();
  process.exit(1);
});
