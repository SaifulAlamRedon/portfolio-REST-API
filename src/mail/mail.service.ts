import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport, Transporter } from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: Transporter;
  private fromAddress: string;

  constructor(private readonly configService: ConfigService) {
    const mailerUrl = this.configService.get<string>('MAILER_URL');
    const user = this.configService.get<string>('MAILER_USER');
    const pass = this.configService.get<string>('MAILER_PASS');
    const host = this.configService.get<string>('MAILER_HOST');
    const port = Number(this.configService.get<string>('MAILER_PORT', '587'));
    const secure = this.configService.get<string>('MAILER_SECURE', 'false') === 'true';
    this.fromAddress =
      this.configService.get<string>('MAILER_FROM') || user || 'no-reply@example.com';

    const transportOptions = mailerUrl
      ? { url: mailerUrl }
      : {
          host,
          port,
          secure,
          auth: user && pass ? { user, pass } : undefined,
        };

    this.transporter = createTransport(transportOptions);
  }

  private async sendMail(options: {
    to: string;
    subject: string;
    text: string;
    html?: string;
  }) {
    try {
      const result = await this.transporter.sendMail({
        from: this.fromAddress,
        ...options,
      });

      return {
        success: true,
        messageId: result.messageId,
        accepted: result.accepted,
        rejected: result.rejected,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to send email. Please check mailer configuration.',
      );
    }
  }

  async sendContactEmail(dto: any) {
    const subject = dto.subject || 'New contact request';
    const text = `Name: ${dto.name || 'N/A'}\nEmail: ${dto.email}\nMessage: ${dto.message}`;
    const html = `<p><strong>Name:</strong> ${dto.name || 'N/A'}</p><p><strong>Email:</strong> ${dto.email}</p><p><strong>Message:</strong><br/>${dto.message}</p>`;

    return this.sendMail({
      to: this.fromAddress,
      subject,
      text,
      html,
    });
  }

  async sendWelcomeEmail(dto: any) {
    const subject = 'Welcome to our portfolio!';
    const text = `Hello ${dto.name || 'there'},\n\n${dto.welcomeMessage || 'Thanks for joining us.'}`;
    const html = `<p>Hello ${dto.name || 'there'},</p><p>${dto.welcomeMessage || 'Thanks for joining us.'}</p>`;

    return this.sendMail({
      to: dto.email,
      subject,
      text,
      html,
    });
  }

  async sendPasswordChangedEmail(dto: any) {
    const subject = 'Your password has been changed';
    const text = `Hello ${dto.name || 'user'},\n\n${dto.message || 'Your password was changed successfully.'}`;
    const html = `<p>Hello ${dto.name || 'user'},</p><p>${dto.message || 'Your password was changed successfully.'}</p>`;

    return this.sendMail({
      to: dto.email,
      subject,
      text,
      html,
    });
  }

  async sendPasswordResetEmail(dto: any) {
    const subject = 'Password reset request';
    const resetUrl = dto.resetUrl || `${this.configService.get<string>('FRONTEND_URL') || ''}/reset-password/${dto.resetToken}`;
    const text = `Reset your password by visiting: ${resetUrl}`;
    const html = `<p>Click the link below to reset your password:</p><p><a href="${resetUrl}">${resetUrl}</a></p>`;

    return this.sendMail({
      to: dto.email,
      subject,
      text,
      html,
    });
  }

  async sendTestimonialApprovedEmail(dto: any) {
    const subject = 'Your testimonial was approved';
    const text = `Hello ${dto.name || 'there'},\n\n${dto.message || 'Your testimonial has been approved.'}`;
    const html = `<p>Hello ${dto.name || 'there'},</p><p>${dto.message || 'Your testimonial has been approved.'}</p>`;

    return this.sendMail({
      to: dto.email,
      subject,
      text,
      html,
    });
  }

  async sendCustomEmail(dto: any) {
    const to = dto.to || dto.email;
    const subject = dto.subject || 'Message from portfolio app';
    const text = dto.message || dto.text || '';
    const html = dto.html || (dto.message ? `<p>${dto.message}</p>` : undefined);

    if (!to) {
      throw new Error('No recipient specified for custom email (dto.to or dto.email)');
    }

    return this.sendMail({
      to,
      subject,
      text,
      html,
    });
  }
}
