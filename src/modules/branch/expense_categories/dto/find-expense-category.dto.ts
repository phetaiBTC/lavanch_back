import { IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { PaginationDto } from 'src/shared/dto/pagination.dto';

export class FindExpenseCategoryDto extends PaginationDto {
  // Filter soft-deleted items: deleted=true => only soft-deleted; false => not-deleted; undefined => all
  @IsOptional()
  @Transform(({ value }) => {
    console.log('Transform deleted value:', value, 'type:', typeof value);
    if (value === 'true') return true;
    if (value === 'false') return false;
    if (value === true) return true;
    if (value === false) return false;
    return undefined; // default: show all (no filter)
  })
  deleted?: boolean;
}
