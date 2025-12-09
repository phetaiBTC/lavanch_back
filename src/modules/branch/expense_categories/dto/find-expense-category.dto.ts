import { IsOptional, IsBoolean } from 'class-validator';
import { Transform } from 'class-transformer';
import { PaginationDto } from 'src/shared/dto/pagination.dto';

export class FindExpenseCategoryDto extends PaginationDto {
  // Filter soft-deleted items: deleted=true => only soft-deleted; false => not-deleted
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === 'true' || value === true) return true;
    if (value === 'false' || value === false) return false;
    return false; // default: not-deleted
  })
  deleted?: boolean;
}
