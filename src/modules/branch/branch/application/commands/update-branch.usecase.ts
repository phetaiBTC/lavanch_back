import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import {
  BRANCH_REPOSITORY,
  type IBranchRepository,
} from '../../domain/branch.repository';
import { Branch } from '../../domain/branch.entity';
import { UpdateBranchDto } from '../../dto/update-branch.dto';

@Injectable()
export class UpdateBranchUseCase {
  constructor(
    @Inject(BRANCH_REPOSITORY)
    private readonly branchRepo: IBranchRepository,
  ) {}

  async execute(id: number, dto: UpdateBranchDto): Promise<Branch> {
    console.log('Update branch - ID:', id, 'DTO:', dto);
    
    const branch = await this.branchRepo.findById(id);
    if (!branch) throw new NotFoundException('Branch not found');
    
    console.log('Current branch data:', branch.value);
    
    const updated = branch.update(dto);
    console.log('Updated branch data:', updated.value);
    
    const result = await this.branchRepo.update(updated);
    console.log('Saved branch data:', result.value);
    
    return result;
  }
}
