import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { SkillsModule } from './skills/skills.module';
import { ExperiencesController } from './experiences/experiences.controller';
import { ExperiencesModule } from './experiences/experiences.module';
import { EducationController } from './education/education.controller';
import { EducationModule } from './education/education.module';
import { CertificatesController } from './certificates/certificates.controller';
import { CertificatesModule } from './certificates/certificates.module';
import { ContactController } from './contact/contact.controller';
import { ContactModule } from './contact/contact.module';
import { TestimonialsController } from './testimonials/testimonials.controller';
import { TestimonialsModule } from './testimonials/testimonials.module';
import { UploadsController } from './uploads/uploads.controller';
import { UploadsModule } from './uploads/uploads.module';
import { AnalyticsController } from './analytics/analytics.controller';
import { AnalyticsModule } from './analytics/analytics.module';
import { SettingsController } from './settings/settings.controller';
import { SettingsService } from './settings/settings.service';
import { SettingsModule } from './settings/settings.module';
import { NewsletterController } from './newsletter/newsletter.controller';
import { NewsletterModule } from './newsletter/newsletter.module';
import { MailController } from './mail/mail.controller';
import { MailModule } from './mail/mail.module';
import { CloudinaryController } from './cloudinary/cloudinary.controller';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { RolesGuard } from './common/guards/roles.guard';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ProjectsModule,
    SkillsModule,
    ExperiencesModule,
    EducationModule,
    CertificatesModule,
    ContactModule,
    TestimonialsModule,
    UploadsModule,
    AnalyticsModule,
    SettingsModule,
    NewsletterModule,
    MailModule,
    CloudinaryModule,
  ],
  controllers: [
    AppController,
    ExperiencesController,
    EducationController,
    CertificatesController,
    ContactController,
    TestimonialsController,
    UploadsController,
    AnalyticsController,
    SettingsController,
    NewsletterController,
    MailController,
    CloudinaryController,
  ],
  providers: [
    AppService,
    SettingsService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
