
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
import { Create${capitalizedName}Dto } from './dto/create-${capitalizedName}.dto';
import { Update${capitalizedName}Dto } from './dto/update-${capitalizedName}.dto';
import { Create${capitalizedName}UseCase } from './application/commands/create-${capitalizedName}.usecase';
import { Update${capitalizedName}UseCase } from './application/commands/update-${capitalizedName}.usecase';
import { GetOne${capitalizedName}UseCase } from './application/queries/getOne-${capitalizedName}.usecase';
import { Get${capitalizedName}UseCase } from './application/queries/get-${capitalizedName}.usecase';
import { ${capitalizedName}Mapper } from './infrastructure/${moduleName}.mapper';
import { Restore${capitalizedName}UseCase } from './application/commands/restore-${capitalizedName}.usecase';
import { SoftDelete${capitalizedName}UseCase } from './application/commands/soft-${capitalizedName}.usecase';
import { HardDelete${capitalizedName}UseCase } from './application/commands/hard-${capitalizedName}.usecase';
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
    protected readonly getOne${capitalizedName}UseCase: GetOne${capitalizedName}UseCase,
    private readonly get${capitalizedName}UseCase: Get${capitalizedName}UseCase,
    protected readonly hardDelete${capitalizedName}UseCase: HardDelete${capitalizedName}UseCase,
    protected readonly softDelete${capitalizedName}UseCase: SoftDelete${capitalizedName}UseCase,
    protected readonly restore${capitalizedName}UseCase: Restore${capitalizedName}UseCase,
  ) {
    super({
      mapper: ${capitalizedName}Mapper,
      findOne: getOne${capitalizedName}UseCase,
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
    return ${capitalizedName}Mapper.toResponseList(await this.get${capitalizedName}UseCase.execute(query));
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