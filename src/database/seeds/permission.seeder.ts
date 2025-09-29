import { PermissionOrm } from 'src/database/typeorm/permission.orm-entity';
import { AuthController } from 'src/modules/Auth/Auth.controller';
import { UserController } from 'src/modules/User/User.controller';
import { IS_PUBLIC_KEY } from 'src/shared/decorator/auth.decorator';
import { DataSource } from 'typeorm';

function generatePermissions(controller: any): { code: string }[] {
  const methods = Object.getOwnPropertyNames(controller.prototype).filter(
    (name) => name !== 'constructor',
  );

  const controllerName = controller.name
    .replace('Controller', '')
    .toLowerCase();

  return methods.reduce<{ code: string }[]>((acc, methodName) => {
    const method = controller.prototype[methodName];
    const isPublic = Reflect.getMetadata(IS_PUBLIC_KEY, method);
    if (!isPublic) acc.push({ code: `${controllerName}-${methodName}` });
    return acc;
  }, []);
}

export async function seedPermissions(dataSource: DataSource) {
  const queryRunner = dataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    const permissionRepo = queryRunner.manager.getRepository(PermissionOrm);

    // รวม controllers ที่จะ generate
    const controllers = [UserController, AuthController];

    const allPermissions = controllers.flatMap((ctrl) =>
      generatePermissions(ctrl),
    );

    // insert ถ้าไม่ซ้ำ
    for (const perm of allPermissions) {
      const exists = await permissionRepo.findOne({
        where: { code: perm.code },
      });
      if (!exists) {
        await permissionRepo.save(perm);
      }
    }

    await queryRunner.commitTransaction();
    console.log('✅ Auto-generate permissions success');
  } catch (err) {
    await queryRunner.rollbackTransaction();
    console.error('❌ Auto-generate permissions failed', err);
  } finally {
    await queryRunner.release();
  }
}
