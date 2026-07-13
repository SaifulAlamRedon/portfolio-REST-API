import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  sendContactEmail(dto: any) {
    return { success: true, type: 'contact', data: dto };
  }

  sendWelcomeEmail(dto: any) {
    return { success: true, type: 'welcome', data: dto };
  }

  sendPasswordChangedEmail(dto: any) {
    return { success: true, type: 'password_changed', data: dto };
  }

  sendPasswordResetEmail(dto: any) {
    return { success: true, type: 'password_reset', data: dto };
  }

  sendTestimonialApprovedEmail(dto: any) {
    return { success: true, type: 'testimonial_approved', data: dto };
  }

  sendCustomEmail(dto: any) {
    return { success: true, type: 'custom', data: dto };
  }
}
