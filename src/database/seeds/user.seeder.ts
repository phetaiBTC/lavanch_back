import { DataSource } from 'typeorm';
import { RoleOrm } from '../typeorm/role.orm-entity';
import { UserOrm } from '../typeorm/user.orm-entity';
import { hashPassword } from 'src/shared/utils/bcrypt.util';

export async function seedUser(dataSource: DataSource) {
  const queryRunner = dataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    const userRepo = queryRunner.manager.getRepository(UserOrm);
    const roleRepo = queryRunner.manager.getRepository(RoleOrm);

    const UserExists = await userRepo.findOne({
      where: { email: 'admin@gmail.com' },
    });
    const roleAdmin = await roleRepo.findOne({
      where: { code: 'admin' },
    });

    if (!UserExists && roleAdmin) {
      const userAdmin = userRepo.create({
        username: 'admin',
        email: 'admin@gmail.com',
        password: await hashPassword('11111111'),
        is_verified: true,
        roles: [roleAdmin],
        permissions: [],
      });
      await userRepo.save(userAdmin);
    }

    await queryRunner.commitTransaction();
    console.log('✅ Auto-generate users success');
  } catch (err) {
    await queryRunner.rollbackTransaction();
    console.error('❌ Auto-generate users failed', err);
  } finally {
    await queryRunner.release();
  }
}
