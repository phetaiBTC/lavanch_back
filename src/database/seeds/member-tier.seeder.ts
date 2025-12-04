import { DataSource } from 'typeorm';
import { MemberTiersOrm } from '../typeorm/member_tiers.orm-entity';

export class MemberTierSeeder {
  public async run(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(MemberTiersOrm);

    const tiers = [
      {
        name: 'Bronze',
        min_spending: 0,
        discount_percent: 0,
        points_multiplier: 1.0,
        is_active: true,
      },
      {
        name: 'Silver',
        min_spending: 5000000, // 5M
        discount_percent: 5,
        points_multiplier: 1.5,
        is_active: true,
      },
      {
        name: 'Gold',
        min_spending: 20000000, // 20M
        discount_percent: 10,
        points_multiplier: 2.0,
        is_active: true,
      },
      {
        name: 'VIP',
        min_spending: 50000000, // 50M
        discount_percent: 15,
        points_multiplier: 3.0,
        is_active: true,
      },
    ];

    for (const tierData of tiers) {
      const exists = await repository.findOne({
        where: { name: tierData.name },
      });

      if (!exists) {
        const tier = repository.create(tierData);
        await repository.save(tier);
        console.log(`✅ Created tier: ${tierData.name}`);
      } else {
        console.log(`⏭️  Tier already exists: ${tierData.name}`);
      }
    }

    console.log('🎉 Member tier seeding completed!');
  }
}
