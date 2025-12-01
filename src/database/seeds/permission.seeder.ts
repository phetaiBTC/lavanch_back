import { join } from 'path';
import { readdirSync, statSync } from 'fs';
import { DataSource } from 'typeorm';
import { PermissionOrm } from 'src/database/typeorm/permission.orm-entity';
import { IS_PUBLIC_KEY } from 'src/shared/decorator/auth.decorator';

// ดึง method ทั้งหมดรวม parent class
function getAllMethods(controller: any) {
  let methods: string[] = [];
  let proto = controller.prototype;

  while (proto && proto !== Object.prototype) {
    methods = methods.concat(Object.getOwnPropertyNames(proto));
    proto = Object.getPrototypeOf(proto);
  }

  return Array.from(new Set(methods)).filter((m) => m !== 'constructor');
}

// generate permissions จาก controller
function generatePermissions(controller: any): { code: string }[] {
  const methods = getAllMethods(controller);
  const controllerName = controller.name
    .replace('Controller', '')
    .toLowerCase();

  return methods.reduce<{ code: string }[]>((acc, methodName) => {
    const proto = controller.prototype;
    const method =
      proto[methodName] ?? Object.getPrototypeOf(proto)[methodName];
    const isPublic = Reflect.getMetadata(IS_PUBLIC_KEY, method);
    if (!isPublic) {
      acc.push({ code: `${controllerName}-${methodName}` });
    }
    return acc;
  }, []);
}

// auto-import controllers จาก folder
function importControllers(folderPath: string): any[] {
  const controllers: any[] = [];

  const files = readdirSync(folderPath);
  files.forEach((file) => {
    const fullPath = join(folderPath, file);
    if (statSync(fullPath).isDirectory()) {
      controllers.push(...importControllers(fullPath));
    } else if (
      file.endsWith('.controller.ts') ||
      file.endsWith('.controller.js')
    ) {
      const moduleExports = require(fullPath);

      // รองรับ default export
      if (moduleExports.default) {
        controllers.push(moduleExports.default);
      }

      // รองรับ named export
      Object.values(moduleExports).forEach((exp) => {
        if (typeof exp === 'function' && exp.name.endsWith('Controller')) {
          controllers.push(exp);
        }
      });
    }
  });

  return controllers;
}

// seed permissions
export async function seedPermissions(dataSource: DataSource) {
  const queryRunner = dataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    const permissionRepo = queryRunner.manager.getRepository(PermissionOrm);

    // auto import controllers จาก src/modules
    const controllers = importControllers(join(__dirname, '../../modules'));

    const allPermissions = controllers.flatMap((ctrl) =>
      generatePermissions(ctrl),
    );
    // หา permission ที่มีอยู่แล้ว
    const existing = await permissionRepo.find({
      where: allPermissions.map((p) => ({ code: p.code })),
    });
    const existingCodes = existing.map((p) => p.code);

    // insert เฉพาะที่ยังไม่มี
    const toInsert = allPermissions.filter(
      (p) => !existingCodes.includes(p.code),
    );
    if (toInsert.length > 0) {
      await permissionRepo.save(toInsert);
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
