
export const generateController = (moduleName: string, capitalize: (str: string) => string): string => {
  const capitalizedName = capitalize(moduleName);
  return `
  
import {
  Body,
  Controller,
  Param,
  Patch,
  Query,
  Post,
  Get,
} from '@nestjs/common';

import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
import { ${capitalizedName} } from './domain/${moduleName}.entity';
import { ${capitalizedName}Orm } from 'src/database/typeorm/${moduleName}.orm-entity';
import { ${capitalizedName}Response } from './interface/${moduleName}.interface';
import { Create${capitalizedName}Dto } from './dto/create-${moduleName}.dto';
import { Update${capitalizedName}Dto } from './dto/update-${moduleName}.dto';
import { Create${capitalizedName}UseCase } from './application/commands/create-${moduleName}.usecase';
import { Update${capitalizedName}UseCase } from './application/commands/update-${moduleName}.usecase';
import { FindOne${capitalizedName}UseCase } from './application/queries/findOne-${moduleName}.usecase';
import { Find${capitalizedName}UseCase } from './application/queries/findAll-${moduleName}.usecase';
import { ${capitalizedName}Mapper } from './infrastructure/${moduleName}.mapper';
import { Restore${capitalizedName}UseCase } from './application/commands/restore-${moduleName}.usecase';
import { SoftDelete${capitalizedName}UseCase } from './application/commands/soft-${moduleName}.usecase';
import { HardDelete${capitalizedName}UseCase } from './application/commands/hard-${moduleName}.usecase';
import { BaseController } from 'src/shared/BaseModule/base.controller';

@Controller('${moduleName}')
export class ${capitalizedName}Controller extends BaseController<
  ${capitalizedName},
  ${capitalizedName}Orm,
  ${capitalizedName}Response,
  Create${capitalizedName}Dto,
  Update${capitalizedName}Dto
> {
  constructor(
    private readonly create${capitalizedName}UseCase: Create${capitalizedName}UseCase,
    private readonly update${capitalizedName}UseCase: Update${capitalizedName}UseCase,
    protected readonly findOne${capitalizedName}UseCase: FindOne${capitalizedName}UseCase,
    private readonly find${capitalizedName}UseCase: Find${capitalizedName}UseCase,
    protected readonly hardDelete${capitalizedName}UseCase: HardDelete${capitalizedName}UseCase,
    protected readonly softDelete${capitalizedName}UseCase: SoftDelete${capitalizedName}UseCase,
    protected readonly restore${capitalizedName}UseCase: Restore${capitalizedName}UseCase,
  ) {
    super({
      mapper: ${capitalizedName}Mapper,
      findOne: findOne${capitalizedName}UseCase,
      hardDelete: hardDelete${capitalizedName}UseCase,
      softDelete: softDelete${capitalizedName}UseCase,
      restore: restore${capitalizedName}UseCase,
    });
  }

  @Post('')
  async create(@Body() body: Create${capitalizedName}Dto): Promise<${capitalizedName}Response> {
    return ${capitalizedName}Mapper.toResponse(await this.create${capitalizedName}UseCase.execute(body));
  }

  @Get('')
  async findAll(
    @Query()
    query: PaginationDto,
  ): Promise<PaginatedResponse<${capitalizedName}Response>> {
    return ${capitalizedName}Mapper.toResponseList(await this.find${capitalizedName}UseCase.execute(query));
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() dto: Update${capitalizedName}Dto,
  ): Promise<${capitalizedName}Response> {
    return ${capitalizedName}Mapper.toResponse(await this.update${capitalizedName}UseCase.execute(id, dto));
  }
}
  
  
  `;
};