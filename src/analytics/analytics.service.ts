import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAnalyticsDto } from './dto/create-analytics.dto';
import { AnalyticsEvent } from './entities/analytics-event.entity';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(AnalyticsEvent)
    private readonly analyticsRepository: Repository<AnalyticsEvent>,
  ) {}

  async trackVisitor(dto: CreateAnalyticsDto) {
    const event = this.analyticsRepository.create({
      eventType: 'visitor',
      page: dto.event,
      referrer: dto.source,
    });

    const saved = await this.analyticsRepository.save(event);
    return { success: true, message: 'Visitor tracked successfully', data: saved };
  }

  async trackPageView(dto: CreateAnalyticsDto) {
    const event = this.analyticsRepository.create({
      eventType: 'page-view',
      page: dto.event,
      referrer: dto.source,
    });

    const saved = await this.analyticsRepository.save(event);
    return { success: true, message: 'Page view tracked successfully', data: saved };
  }

  async trackProjectView(dto: CreateAnalyticsDto) {
    const event = this.analyticsRepository.create({
      eventType: 'project-view',
      page: dto.event,
      projectId: dto.userId,
      referrer: dto.source,
    });

    const saved = await this.analyticsRepository.save(event);
    return { success: true, message: 'Project view tracked successfully', data: saved };
  }

  async totalVisitors() {
    const count = await this.analyticsRepository.count({ where: { eventType: 'visitor' } });
    return { success: true, message: 'Total visitors fetched successfully', data: { totalVisitors: count } };
  }

  async monthlyVisitors() {
    const rows = await this.analyticsRepository
      .createQueryBuilder('event')
      .select("TO_CHAR(event.createdAt, 'YYYY-MM')", 'month')
      .addSelect('COUNT(*)', 'count')
      .where("event.eventType = :type", { type: 'visitor' })
      .groupBy("TO_CHAR(event.createdAt, 'YYYY-MM')")
      .orderBy("TO_CHAR(event.createdAt, 'YYYY-MM')", 'ASC')
      .getRawMany();

    return { success: true, message: 'Monthly visitors fetched successfully', data: rows };
  }

  async dailyVisitors() {
    const rows = await this.analyticsRepository
      .createQueryBuilder('event')
      .select("TO_CHAR(event.createdAt, 'YYYY-MM-DD')", 'day')
      .addSelect('COUNT(*)', 'count')
      .where("event.eventType = :type", { type: 'visitor' })
      .groupBy("TO_CHAR(event.createdAt, 'YYYY-MM-DD')")
      .orderBy("TO_CHAR(event.createdAt, 'YYYY-MM-DD')", 'ASC')
      .getRawMany();

    return { success: true, message: 'Daily visitors fetched successfully', data: rows };
  }

  async browserStatistics() {
    const rows = await this.analyticsRepository
      .createQueryBuilder('event')
      .select('event.browser', 'browser')
      .addSelect('COUNT(*)', 'count')
      .where('event.browser IS NOT NULL')
      .groupBy('event.browser')
      .orderBy('count', 'DESC')
      .getRawMany();

    return { success: true, message: 'Browser statistics fetched successfully', data: rows };
  }

  async deviceStatistics() {
    const rows = await this.analyticsRepository
      .createQueryBuilder('event')
      .select('event.device', 'device')
      .addSelect('COUNT(*)', 'count')
      .where('event.device IS NOT NULL')
      .groupBy('event.device')
      .orderBy('count', 'DESC')
      .getRawMany();

    return { success: true, message: 'Device statistics fetched successfully', data: rows };
  }

  async countryStatistics() {
    const rows = await this.analyticsRepository
      .createQueryBuilder('event')
      .select('event.country', 'country')
      .addSelect('COUNT(*)', 'count')
      .where('event.country IS NOT NULL')
      .groupBy('event.country')
      .orderBy('count', 'DESC')
      .getRawMany();

    return { success: true, message: 'Country statistics fetched successfully', data: rows };
  }

  async referrerStatistics() {
    const rows = await this.analyticsRepository
      .createQueryBuilder('event')
      .select('event.referrer', 'referrer')
      .addSelect('COUNT(*)', 'count')
      .where('event.referrer IS NOT NULL')
      .groupBy('event.referrer')
      .orderBy('count', 'DESC')
      .getRawMany();

    return { success: true, message: 'Referrer statistics fetched successfully', data: rows };
  }

  async popularProjects() {
    const rows = await this.analyticsRepository
      .createQueryBuilder('event')
      .select('event.projectId', 'projectId')
      .addSelect('COUNT(*)', 'count')
      .where("event.eventType = :type", { type: 'project-view' })
      .andWhere('event.projectId IS NOT NULL')
      .groupBy('event.projectId')
      .orderBy('count', 'DESC')
      .limit(10)
      .getRawMany();

    return { success: true, message: 'Popular projects fetched successfully', data: rows };
  }

  async contactStatistics() {
    const totalContacts = await this.analyticsRepository.count({ where: { eventType: 'visitor' } });
    return {
      success: true,
      message: 'Contact statistics fetched successfully',
      data: {
        totalContacts,
        totalVisitors: totalContacts,
      },
    };
  }
}
