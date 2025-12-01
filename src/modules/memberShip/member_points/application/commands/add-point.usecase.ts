import { Injectable, Inject } from '@nestjs/common';
import { MEMBER_POINT_REPOSITORY, type IMemberPointRepository } from '../../domain/member-point.repository';
import { MemberPoint } from '../../domain/member-point.entity';
import { AddPointDto } from '../../dto/add-point.dto';

/**
 * AddPointUseCase - Simply adds points to member balance
 * 
 * Business Flow:
 * - Add points to member_points table (increment balance)
 * - No transaction history logging needed for earning points
 * - Points are typically earned passively through purchases
 * 
 * Use Case: When customer makes a purchase and earns points automatically
 */
@Injectable()
export class AddPointUseCase {
  constructor(
    @Inject(MEMBER_POINT_REPOSITORY)
    private readonly pointRepo: IMemberPointRepository,
  ) {}

  async execute(dto: AddPointDto): Promise<MemberPoint> {
    // Simply add points to balance
    // addPoints() will create the record if it doesn't exist, or increment if it does
    return await this.pointRepo.addPoints(
      dto.member_id,
      dto.branch_id,
      dto.points,
    );
  }
}
