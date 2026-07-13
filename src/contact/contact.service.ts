import { Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';

@Injectable()
export class ContactService {
  submitMessage(dto: CreateContactDto) {
    return { status: 'submitted', data: dto };
  }

  sendEmail(dto: CreateContactDto) {
    return { status: 'email_sent', data: dto };
  }

  findAllMessages(query?: string) {
    return { status: 'ok', query };
  }

  findOneMessage(id: string) {
    return { status: 'ok', id };
  }

  markAsRead(id: string) {
    return { status: 'read', id };
  }

  markAsUnread(id: string) {
    return { status: 'unread', id };
  }

  deleteMessage(id: string) {
    return { status: 'deleted', id };
  }

  searchMessages(query?: string) {
    return { status: 'search', query };
  }

  getStatistics() {
    return { status: 'statistics', data: {} };
  }
}
