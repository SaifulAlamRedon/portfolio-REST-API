import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { MailService } from '../mail/mail.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { ContactMessage } from './entities/contact-message.entity';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(ContactMessage)
    private readonly contactMessageRepository: Repository<ContactMessage>,
    private readonly mailService: MailService,
  ) {}

  async submitMessage(dto: CreateContactDto) {
    const message = this.contactMessageRepository.create({
      name: dto.name,
      email: dto.email,
      subject: dto.subject,
      message: dto.message,
    });

    const saved = await this.contactMessageRepository.save(message);

    await this.sendEmail(dto);

    return { success: true, message: 'Contact form submitted successfully', data: saved };
  }

  async sendEmail(dto: CreateContactDto) {
    try {
      await this.mailService.sendCustomEmail({
        to: process.env.MAIL_TO || 'admin@example.com',
        subject: `New contact message: ${dto.subject || 'Portfolio Contact'}`,
        html: `
          <p><strong>Name:</strong> ${dto.name}</p>
          <p><strong>Email:</strong> ${dto.email}</p>
          <p><strong>Subject:</strong> ${dto.subject || 'N/A'}</p>
          <p><strong>Message:</strong></p>
          <p>${dto.message}</p>
        `,
      });

      return { success: true, message: 'Email notification sent successfully' };
    } catch (error) {
      return { success: false, message: 'Email notification failed', error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  async findAllMessages(query?: string) {
    const messages = await this.contactMessageRepository.find({
      where: query ? [{ name: Like(`%${query}%`) }, { email: Like(`%${query}%`) }, { subject: Like(`%${query}%`) }, { message: Like(`%${query}%`) }] : {},
      order: { createdAt: 'DESC' },
      withDeleted: false,
    });

    return { success: true, message: 'Messages fetched successfully', data: messages };
  }

  async findOneMessage(id: string) {
    const message = await this.contactMessageRepository.findOne({
      where: { id },
      withDeleted: false,
    });

    if (!message) {
      throw new NotFoundException('Message not found');
    }

    return { success: true, message: 'Message fetched successfully', data: message };
  }

  async markAsRead(id: string) {
    const message = await this.contactMessageRepository.findOne({
      where: { id },
      withDeleted: false,
    });

    if (!message) {
      throw new NotFoundException('Message not found');
    }

    message.isRead = true;
    const saved = await this.contactMessageRepository.save(message);

    return { success: true, message: 'Message marked as read', data: saved };
  }

  async markAsUnread(id: string) {
    const message = await this.contactMessageRepository.findOne({
      where: { id },
      withDeleted: false,
    });

    if (!message) {
      throw new NotFoundException('Message not found');
    }

    message.isRead = false;
    const saved = await this.contactMessageRepository.save(message);

    return { success: true, message: 'Message marked as unread', data: saved };
  }

  async deleteMessage(id: string) {
    const message = await this.contactMessageRepository.findOne({
      where: { id },
      withDeleted: false,
    });

    if (!message) {
      throw new NotFoundException('Message not found');
    }

    await this.contactMessageRepository.softDelete(message.id);
    return { success: true, message: 'Message deleted successfully' };
  }

  async searchMessages(query?: string) {
    return this.findAllMessages(query);
  }

  async getStatistics() {
    const [total, unread] = await Promise.all([
      this.contactMessageRepository.count({ withDeleted: false }),
      this.contactMessageRepository.count({ where: { isRead: false }, withDeleted: false }),
    ]);

    return { success: true, message: 'Statistics fetched successfully', data: { total, unread, read: total - unread } };
  }
}
