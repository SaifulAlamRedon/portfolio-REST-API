import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { NewsletterService } from './newsletter.service';
import { CreateNewsletterDto } from './dto/create-newsletter.dto';
import { UpdateNewsletterDto } from './dto/update-newsletter.dto';

@Controller('newsletter')
export class NewsletterController {
  constructor(private readonly newsletterService: NewsletterService) {}

  @Post()
  subscribe(@Body() dto: CreateNewsletterDto) {
    return this.newsletterService.subscribe(dto);
  }

  @Get()
  findAll() {
    return this.newsletterService.findAllSubscribers();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.newsletterService.findSubscriber(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateNewsletterDto) {
    return this.newsletterService.updateSubscriber(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.newsletterService.removeSubscriber(id);
  }
}
