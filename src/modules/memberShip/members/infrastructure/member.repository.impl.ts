import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MembersOrm } from 'src/database/typeorm/members.orm-entity';
import { MemberTiersOrm } from 'src/database/typeorm/member_tiers.orm-entity';
import { IMemberRepository } from '../domain/member.repository';
import { Member } from '../domain/member.entity';
import { MemberMapper } from './member.mapper';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
import { fetchWithPagination } from 'src/shared/utils/pagination.util';

@Injectable()
export class MemberRepositoryImpl implements IMemberRepository {
  constructor(
    @InjectRepository(MembersOrm)
    private readonly memberRepo: Repository<MembersOrm>,
    @InjectRepository(MemberTiersOrm)
    private readonly tierRepo: Repository<MemberTiersOrm>,
  ) {}

  async findAll(query: PaginationDto): Promise<PaginatedResponse<Member>> {
    const qb = this.memberRepo.createQueryBuilder('members').withDeleted();
    return await fetchWithPagination({
      qb,
      page: query.page || 1,
      type: query.type,
      search: { kw: query.search, field: 'name' },
      is_active: query.is_active,
      sort: query.sort,
      limit: query.limit || 10,
      toDomain: MemberMapper.toDomain,
    });
  }

  async findById(id: number): Promise<Member | null> {
    const entity = await this.memberRepo.findOne({ where: { id } });
    return entity ? MemberMapper.toDomain(entity) : null;
  }

  async findByPhone(phone: string): Promise<Member | null> {
    const entity = await this.memberRepo.findOne({ where: { phone } });
    return entity ? MemberMapper.toDomain(entity) : null;
  }

  async findByMemberNo(memberNo: string): Promise<Member | null> {
    const entity = await this.memberRepo.findOne({ where: { member_no: memberNo } });
    return entity ? MemberMapper.toDomain(entity) : null;
  }

  /**
   * Generate next member_no in format MB000001
   * Finds max existing number and increments
   */
  async getNextMemberNo(): Promise<string> {
    const lastMember = await this.memberRepo
      .createQueryBuilder('members')
      .orderBy('members.id', 'DESC')
      .getOne();

    if (!lastMember || !lastMember.member_no) {
      return 'MB000001';
    }

    // Extract numeric part from MB000001 format
    const numericPart = parseInt(lastMember.member_no.replace('MB', ''), 10);
    const nextNumber = numericPart + 1;
    
    // Pad with zeros to 6 digits
    return `MB${nextNumber.toString().padStart(6, '0')}`;
  }

  async create(member: Member): Promise<Member> {
    const entity = this.memberRepo.create(MemberMapper.toSchema(member));
    const saved = await this.memberRepo.save(entity);
    return MemberMapper.toDomain(saved);
  }

  async update(member: Member): Promise<Member> {
    const saved = await this.memberRepo.save(MemberMapper.toSchema(member));
    return MemberMapper.toDomain(saved);
  }

  async hardDelete(id: number): Promise<{ message: string }> {
    await this.memberRepo.delete(id);
    return { message: 'hard delete successfully' };
  }

  async softDelete(id: number): Promise<{ message: string }> {
    await this.memberRepo.softDelete(id);
    return { message: 'soft delete successfully' };
  }

  async restore(id: number): Promise<{ message: string }> {
    await this.memberRepo.restore(id);
    return { message: 'restore successfully' };
  }

  /**
   * Update total spending for a member
   */
  async updateTotalSpending(id: number, amount: number): Promise<void> {
    await this.memberRepo.increment({ id }, 'total_spending', amount);
  }

  /**
   * Auto-upgrade member tier based on total_spending
   * Finds highest tier the member qualifies for
   */
  async autoUpgradeTier(id: number): Promise<void> {
    const member = await this.memberRepo.findOne({ where: { id } });
    if (!member) return;

    const qualifiedTier = await this.tierRepo
      .createQueryBuilder('tier')
      .where('tier.min_spending <= :spending', { spending: member.total_spending })
      .andWhere('tier.is_active = :active', { active: true })
      .orderBy('tier.min_spending', 'DESC')
      .getOne();

    if (qualifiedTier && member.tier_id !== qualifiedTier.id) {
      await this.memberRepo.update(id, { tier_id: qualifiedTier.id });
    }
  }
}
