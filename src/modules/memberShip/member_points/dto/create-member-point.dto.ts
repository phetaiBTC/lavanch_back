import { IsNumber, Min } from 'class-validator';

export class CreateMemberPointDto {
  @IsNumber()
  member_id: number;

  @IsNumber()
  branch_id: number;

  @IsNumber()
  @Min(0)
  points: number;
}
