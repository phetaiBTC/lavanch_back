import { IsNotEmpty, IsNumber, IsEnum } from 'class-validator';

export enum ApprovalAction {
  APPROVE = 'APPROVE',
  REJECT = 'REJECT',
}

export class ApproveAdjustmentDto {
  @IsNotEmpty()
  @IsEnum(ApprovalAction)
  action: ApprovalAction;
}
