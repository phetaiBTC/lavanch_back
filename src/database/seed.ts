import { DataSource } from 'typeorm';
import { AppDataSource } from './data-source';
import { seedPermissions } from './seeds/permission.seeder';
import { seedRole } from './seeds/role.seeder';
import { seedUser } from './seeds/user.seeder';
import { seedProvince } from './seeds/province.seeder';
import { seedDistrict } from './seeds/district.seeder';
import { seedVillage } from './seeds/village.seeder';

async function runSeed() {
  const dataSource: DataSource = await AppDataSource.initialize();

  console.log('🌱 Seeding database...');
  await seedProvince(dataSource);
  await seedDistrict(dataSource);
  await seedVillage(dataSource);
  await seedPermissions(dataSource);
  await seedRole(dataSource);
  await seedUser(dataSource);
  await dataSource.destroy();
  console.log('✅ Seeding complete');
}

runSeed().catch((err) => {
  console.error('❌ Seeding failed', err);
  process.exit(1);
});
