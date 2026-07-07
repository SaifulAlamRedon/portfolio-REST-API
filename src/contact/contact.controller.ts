import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  submit(@Body() dto: CreateContactDto) {
    return this.contactService.submitMessage(dto);
  }

  @Post('send-email')
  sendEmail(@Body() dto: CreateContactDto) {
    return this.contactService.sendEmail(dto);
  }

  @Get('messages')
  findAll(@Query('q') q?: string) {
    return this.contactService.findAllMessages(q);
  }

  @Get('messages/:id')
  findOne(@Param('id') id: string) {
    return this.contactService.findOneMessage(id);
  }

  @Patch('messages/:id/read')
  markRead(@Param('id') id: string) {
    return this.contactService.markAsRead(id);
  }

  @Patch('messages/:id/unread')
  markUnread(@Param('id') id: string) {
    return this.contactService.markAsUnread(id);
  }

  @Delete('messages/:id')
  remove(@Param('id') id: string) {
    return this.contactService.deleteMessage(id);
  }

  @Get('search')
  search(@Query('q') q?: string) {
    return this.contactService.searchMessages(q);
  }

  @Get('statistics')
  statistics() {
    return this.contactService.getStatistics();
  }
}
