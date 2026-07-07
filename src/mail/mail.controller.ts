import { Body, Controller, Post } from '@nestjs/common';
import { MailService } from './mail.service';
import { ContactMailDto } from './dto/contact-mail.dto';
import { WelcomeMailDto } from './dto/welcome-mail.dto';
import { PasswordChangedMailDto } from './dto/password-changed-mail.dto';
import { PasswordResetMailDto } from './dto/password-reset-mail.dto';
import { TestimonialApprovedMailDto } from './dto/testimonial-approved-mail.dto';
import { CustomMailDto } from './dto/custom-mail.dto';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('contact')
  contact(@Body() dto: ContactMailDto) {
    return this.mailService.sendContactEmail(dto);
  }

  @Post('welcome')
  welcome(@Body() dto: WelcomeMailDto) {
    return this.mailService.sendWelcomeEmail(dto);
  }

  @Post('password-changed')
  passwordChanged(@Body() dto: PasswordChangedMailDto) {
    return this.mailService.sendPasswordChangedEmail(dto);
  }

  @Post('password-reset')
  passwordReset(@Body() dto: PasswordResetMailDto) {
    return this.mailService.sendPasswordResetEmail(dto);
  }

  @Post('testimonial-approved')
  testimonialApproved(@Body() dto: TestimonialApprovedMailDto) {
    return this.mailService.sendTestimonialApprovedEmail(dto);
  }

  @Post('custom')
  custom(@Body() dto: CustomMailDto) {
    return this.mailService.sendCustomEmail(dto);
  }
}
