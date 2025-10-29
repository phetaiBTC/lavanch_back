import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UniqueValidatorService {
  async validateUniqueField<T>(
    findFn: () => Promise<T | undefined>,
    errorMessage: string,
  ): Promise<void> {
    try {
      const existing = await findFn();
      if (existing) throw new BadRequestException(errorMessage);
    } catch (error) {
      if (!(error instanceof NotFoundException)) throw error;
    }
  }
}
