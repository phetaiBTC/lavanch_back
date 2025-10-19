import { Injectable, NotFoundException } from '@nestjs/common';
import { GetByEmailUserUseCase } from '../queries/getByEmail-User.usecase';
import { SendEmailUserUseCase } from 'src/modules/mail/application/sendMail-User.usecase';
@Injectable()
export class sendEmailUserUseCase {
  constructor(
    private readonly findByEmail: GetByEmailUserUseCase,
    private readonly sendEmailUserUseCase: SendEmailUserUseCase,
  ) {}
  async reset(email: string): Promise<{ message: string }> {
    const user = await this.findByEmail.execute(email);
    if (!user) throw new NotFoundException('User not found');
    return await this.sendEmailUserUseCase.reset(email);
  }
  async create(email: string): Promise<{ message: string }> {
    const user = await this.findByEmail.execute(email);
    if (!user) throw new NotFoundException('User not found');
    return await this.sendEmailUserUseCase.create({
      email: user.value.email,
      username: user.value.username,
    });
  }
}
