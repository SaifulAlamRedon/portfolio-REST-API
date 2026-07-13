import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Public } from '../common/decorators/public.decorator';
import { Roles } from '../common/decorators/roles.decorator';

@UseGuards(JwtAuthGuard)
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Public()
  @Post()
  submit(@Body() dto: CreateContactDto) {
    return this.contactService.submitMessage(dto);
  }

  @Roles('admin')
  @Post('send-email')
  sendEmail(@Body() dto: CreateContactDto) {
    return this.contactService.sendEmail(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  @Get('messages')
  findAll(@Query('q') q?: string) {
    return this.contactService.findAllMessages(q);
  }

  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  @Get('messages/:id')
  findOne(@Param('id') id: string) {
    return this.contactService.findOneMessage(id);
  }

  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  @Patch('messages/:id/read')
  markRead(@Param('id') id: string) {
    return this.contactService.markAsRead(id);
  }

  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  @Patch('messages/:id/unread')
  markUnread(@Param('id') id: string) {
    return this.contactService.markAsUnread(id);
  }

  @UseGuards(JwtAuthGuard)
  @Roles('admin')
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
