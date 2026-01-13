import { IsOptional, IsIn } from 'class-validator';
import { PaginationDto } from 'src/shared/dto/pagination.dto';

export enum DeletedFilter {
  TRUE = 'true',
  FALSE = 'false',
}

export class FindExpenseCategoryDto extends PaginationDto {
  // Filter soft-deleted items: deleted='true' => only soft-deleted; 'false' => not-deleted; undefined => all
  @IsOptional()
  @IsIn(['true', 'false'])
  deleted?: 'true' | 'false';
  
  // Note: status from PaginationDto already handles is_active filtering
  // status: 'active' => is_active = true
  // status: 'inactive' => is_active = false
  // status: 'all' or undefined => no is_active filter
}
