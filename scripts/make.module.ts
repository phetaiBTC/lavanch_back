import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';
import { generateEntity } from './domain/make.entity';
import { generateRepository } from './domain/make.repository';
import { generateRepositoryImpl } from './infrastructure/make.repository.impl';
import { generateInterface } from './interface/make.interface';
import { generateCreateDto } from './dto/create-make.dto';
import { generateUpdateDto } from './dto/update-make.dto';
import { generateMapper } from './infrastructure/make.mapper';
import { generateCreateUseCase } from './application/commands/create-make.usecase';
import { generateUpdateUseCase } from './application/commands/update-make.usecase';
import { generateHardDeleteUseCase } from './application/commands/hard-make.usecase';
import { generateSoftDeleteUseCase } from './application/commands/soft-make.usecase';
import { generateRestoreUseCase } from './application/commands/restore-make.usecase';
import { generateGetUseCase } from './application/queries/findAll-make.usecase';
import { generateGetOneUseCase } from './application/queries/findOne-make.usecase';
import { generateController } from './make.controller';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Use current working directory (script should be run from project root)
const projectRoot = process.cwd();

// Function to capitalize first letter
const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// Function to create directory if it doesn't exist
const createDirIfNotExists = (dirPath: string): void => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Created directory: ${dirPath}`);
  }
};

// Function to create file with content
const createFile = (filePath: string, content: string): void => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Created file: ${filePath}`);
  } else {
    console.log(`File already exists: ${filePath}`);
  }
};

const generateModule = (moduleName: string): string => {
  const capitalizedName = capitalize(moduleName);
  return `
  
  import { Module } from '@nestjs/common';
  import { ${capitalizedName}Controller } from './${moduleName}.controller';
  import { TypeOrmModule } from '@nestjs/typeorm';
  import { ${capitalizedName}Orm } from 'src/database/typeorm/${moduleName}.orm-entity';
  import { ${capitalizedName}RepositoryImpl } from './infrastructure/${moduleName}.repository.impl';
  import { ${moduleName.toUpperCase()}_REPOSITORY } from './domain/${moduleName}.repository';
  import { Create${capitalizedName}UseCase } from './application/commands/create-${capitalizedName}.usecase';
  import { Update${capitalizedName}UseCase } from './application/commands/update-${capitalizedName}.usecase';
  import { GetOne${capitalizedName}UseCase } from './application/queries/getOne-${capitalizedName}.usecase';
  import { Get${capitalizedName}UseCase } from './application/queries/get-${capitalizedName}.usecase';
  import { HardDelete${capitalizedName}UseCase } from './application/commands/hard-${capitalizedName}.usecase';
  import { SoftDelete${capitalizedName}UseCase } from './application/commands/soft-${capitalizedName}.usecase';
  import { Restore${capitalizedName}UseCase } from './application/commands/restore-${capitalizedName}.usecase';
  
  @Module({
    imports: [TypeOrmModule.forFeature([${capitalizedName}Orm])],
    controllers: [${capitalizedName}Controller],
    providers: [
      {
        provide: ${moduleName.toUpperCase()}_REPOSITORY,
        useClass: ${capitalizedName}RepositoryImpl,
      },
      Create${capitalizedName}UseCase,
      Update${capitalizedName}UseCase,
      GetOne${capitalizedName}UseCase,
      Get${capitalizedName}UseCase,
      HardDelete${capitalizedName}UseCase,
      SoftDelete${capitalizedName}UseCase,
      Restore${capitalizedName}UseCase,
    ],
  })
  export class ${capitalizedName}Module {}
  
  
  `;
};

const generateOrmEntity = (moduleName: string): string => {
  const capitalizedName = capitalize(moduleName);
  return `
  
  import { ShardOrm } from 'src/shared/typeorm/base.orm-entity';
  import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
  
  @Entity('${moduleName}')
  export class ${capitalizedName}Orm extends ShardOrm {
    @Column() name: string;
  }
  
  
  `;
};

// Main function to create module
const createModule = (moduleName: string): void => {
  const modulePath = path.join(projectRoot, 'src', 'modules', moduleName);

  console.log(`Creating module: ${moduleName}`);
  console.log(`Module path: ${modulePath}`);

  const directories = [
    path.join(modulePath, 'application', 'commands'),
    path.join(modulePath, 'application', 'queries'),
    path.join(modulePath, 'domain'),
    path.join(modulePath, 'dto'),
    path.join(modulePath, 'infrastructure'),
    path.join(modulePath, 'interface'),
  ];

  directories.forEach((dir) => createDirIfNotExists(dir));

  // Create files
  createFile(
    path.join(modulePath, 'domain', `${moduleName}.entity.ts`),
    generateEntity(moduleName, capitalize),
  );

  createFile(
    path.join(modulePath, 'domain', `${moduleName}.repository.ts`),
    generateRepository(moduleName, capitalize),
  );

  createFile(
    path.join(modulePath, 'infrastructure', `${moduleName}.repository.impl.ts`),
    generateRepositoryImpl(moduleName, capitalize),
  );

  createFile(
    path.join(modulePath, 'infrastructure', `${moduleName}.mapper.ts`),
    generateMapper(moduleName, capitalize),
  );

  createFile(
    path.join(modulePath, 'interface', `${moduleName}.interface.ts`),
    generateInterface(moduleName, capitalize),
  );

  createFile(
    path.join(modulePath, 'dto', `create-${moduleName}.dto.ts`),
    generateCreateDto(moduleName, capitalize),
  );

  createFile(
    path.join(modulePath, 'dto', `update-${moduleName}.dto.ts`),
    generateUpdateDto(moduleName, capitalize),
  );

  // Application layer - Commands
  createFile(
    path.join(
      modulePath,
      'application',
      'commands',
      `create-${moduleName}.usecase.ts`,
    ),
    generateCreateUseCase(moduleName, capitalize),
  );

  createFile(
    path.join(
      modulePath,
      'application',
      'commands',
      `update-${moduleName}.usecase.ts`,
    ),
    generateUpdateUseCase(moduleName, capitalize),
  );

  createFile(
    path.join(
      modulePath,
      'application',
      'commands',
      `hard-${moduleName}.usecase.ts`,
    ),
    generateHardDeleteUseCase(moduleName, capitalize),
  );

  createFile(
    path.join(
      modulePath,
      'application',
      'commands',
      `soft-${moduleName}.usecase.ts`,
    ),
    generateSoftDeleteUseCase(moduleName, capitalize),
  );

  createFile(
    path.join(
      modulePath,
      'application',
      'commands',
      `restore-${moduleName}.usecase.ts`,
    ),
    generateRestoreUseCase(moduleName, capitalize),
  );

  // Application layer - Queries
  createFile(
    path.join(
      modulePath,
      'application',
      'queries',
      `findAll-${moduleName}.usecase.ts`,
    ),
    generateGetUseCase(moduleName, capitalize),
  );

  createFile(
    path.join(
      modulePath,
      'application',
      'queries',
      `findOne-${moduleName}.usecase.ts`,
    ),
    generateGetOneUseCase(moduleName, capitalize),
  );

  createFile(
    path.join(modulePath, `${moduleName}.controller.ts`),
    generateController(moduleName, capitalize),
  );

  createFile(
    path.join(modulePath, `${moduleName}.module.ts`),
    generateModule(moduleName),
  );

  // Create ORM entity in database folder
  const ormEntityPath = path.join(
    projectRoot,
    'src',
    'database',
    'typeorm',
    `${moduleName}.orm-entity.ts`,
  );
  createFile(ormEntityPath, generateOrmEntity(moduleName));

  console.log(`✅ Module '${moduleName}' created successfully!`);
  console.log(`📁 Location: ${modulePath}`);
  console.log(`💡 Don't forget to:`);
  console.log(`   1. Import the ORM entity in your database module`);
  console.log(`   2. Add the module to your app.module.ts imports`);
};

// Main execution
const main = () => {
  rl.question('Enter module name: ', (moduleName) => {
    if (!moduleName || moduleName.trim() === '') {
      console.log('❌ Module name cannot be empty!');
      rl.close();
      return;
    }

    const normalizedName = moduleName.toLowerCase().trim();
    createModule(normalizedName);
    rl.close();
  });
};

main();
