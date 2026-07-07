import { Injectable } from '@nestjs/common';
import { CreateNewsletterDto } from './dto/create-newsletter.dto';
import { UpdateNewsletterDto } from './dto/update-newsletter.dto';

@Injectable()
export class NewsletterService {
  private readonly subscribers: any[] = [];

  subscribe(dto: CreateNewsletterDto) {
    const newSubscriber = {
      id: (this.subscribers.length + 1).toString(),
      email: dto.email,
      name: dto.name,
      subscribedAt: new Date().toISOString(),
      isActive: true,
    };
    this.subscribers.push(newSubscriber);
    return newSubscriber;
  }

  findAllSubscribers() {
    return this.subscribers;
  }

  findSubscriber(id: string) {
    return this.subscribers.find((subscriber) => subscriber.id === id);
  }

  updateSubscriber(id: string, dto: UpdateNewsletterDto) {
    const subscriber = this.findSubscriber(id);
    if (!subscriber) {
      return null;
    }
    Object.assign(subscriber, dto);
    return subscriber;
  }

  removeSubscriber(id: string) {
    const index = this.subscribers.findIndex((subscriber) => subscriber.id === id);
    if (index === -1) {
      return null;
    }
    return this.subscribers.splice(index, 1)[0];
  }
}
