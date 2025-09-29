import { DataSource } from 'typeorm';
import { RoleOrm } from '../typeorm/role.orm-entity';
import { PermissionOrm } from '../typeorm/permission.orm-entity';

export async function seedRole(dataSource: DataSource) {
  const queryRunner = dataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    const roleRepo = queryRunner.manager.getRepository(RoleOrm);
    const permissions = await queryRunner.manager.find(PermissionOrm);
    const exists = await roleRepo.findOne({
      where: { code: 'admin' },
    });

    if (!exists) {
      const roleAdmin = roleRepo.create({ code: 'admin', permissions });
      await roleRepo.save(roleAdmin);
    }

    await queryRunner.commitTransaction();
    console.log('✅ Auto-generate roles success');
  } catch (err) {
    await queryRunner.rollbackTransaction();
    console.error('❌ Auto-generate roles failed', err);
  } finally {
    await queryRunner.release();
  }
}
