import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import {
  BRANCH_EXPENSE_REPOSITORY,
  type IBranchExpenseRepository,
} from '../../domain/branch-expense.repository';

export interface GetReceiptImagesResponse {
  id: number;
  receipt_images: string[];
}

@Injectable()
export class GetReceiptImagesUseCase {
  constructor(
    @Inject(BRANCH_EXPENSE_REPOSITORY)
    private readonly expenseRepo: IBranchExpenseRepository,
  ) {}

  async execute(id: number): Promise<GetReceiptImagesResponse> {
    const expense = await this.expenseRepo.findById(id);
    
    if (!expense) {
      throw new NotFoundException('Branch expense not found');
    }

    // Parse receipt_image from comma-separated string to array
    const receiptImages = expense.value.receipt_image 
      ? expense.value.receipt_image.split(',').filter(Boolean)
      : [];

    return {
      id: expense.value.id!,
      receipt_images: receiptImages,
    };
  }
}
