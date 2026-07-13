import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { CreateAnalyticsDto } from './dto/create-analytics.dto';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Post('visitor')
  trackVisitor(@Body() dto: CreateAnalyticsDto) {
    return this.analyticsService.trackVisitor(dto);
  }

  @Post('page-view')
  trackPageView(@Body() dto: CreateAnalyticsDto) {
    return this.analyticsService.trackPageView(dto);
  }

  @Post('project-view')
  trackProjectView(@Body() dto: CreateAnalyticsDto) {
    return this.analyticsService.trackProjectView(dto);
  }

  @Get('visitors/total')
  totalVisitors() {
    return this.analyticsService.totalVisitors();
  }

  @Get('visitors/monthly')
  monthlyVisitors() {
    return this.analyticsService.monthlyVisitors();
  }

  @Get('visitors/daily')
  dailyVisitors() {
    return this.analyticsService.dailyVisitors();
  }

  @Get('browser')
  browserStatistics() {
    return this.analyticsService.browserStatistics();
  }

  @Get('device')
  deviceStatistics() {
    return this.analyticsService.deviceStatistics();
  }

  @Get('country')
  countryStatistics() {
    return this.analyticsService.countryStatistics();
  }

  @Get('referrer')
  referrerStatistics() {
    return this.analyticsService.referrerStatistics();
  }

  @Get('projects/popular')
  popularProjects() {
    return this.analyticsService.popularProjects();
  }

  @Get('contact')
  contactStatistics() {
    return this.analyticsService.contactStatistics();
  }
}
