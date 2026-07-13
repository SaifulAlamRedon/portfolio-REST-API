import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { NewsletterService } from './newsletter.service';
import { CreateNewsletterDto } from './dto/create-newsletter.dto';
import { UpdateNewsletterDto } from './dto/update-newsletter.dto';
import { Public } from '../common/decorators/public.decorator';
import { Roles } from '../common/decorators/roles.decorator';

@UseGuards(JwtAuthGuard)
@Controller('newsletter')
export class NewsletterController {
  constructor(private readonly newsletterService: NewsletterService) {}

  @Public()
  @Post()
  subscribe(@Body() dto: CreateNewsletterDto) {
    return this.newsletterService.subscribe(dto);
  }

  @Roles('admin')
  @Get()
  findAll() {
    return this.newsletterService.findAllSubscribers();
  }

  @Roles('admin')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.newsletterService.findSubscriber(id);
  }

  @Roles('admin')
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateNewsletterDto) {
    return this.newsletterService.updateSubscriber(id, dto);
  }

  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.newsletterService.removeSubscriber(id);
  }
}
