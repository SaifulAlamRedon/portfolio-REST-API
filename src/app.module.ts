import * as crypto from 'crypto';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { SkillsModule } from './skills/skills.module';
import { ExperiencesModule } from './experiences/experiences.module';
import { EducationModule } from './education/education.module';
import { CertificatesModule } from './certificates/certificates.module';
import { ContactModule } from './contact/contact.module';
import { TestimonialsModule } from './testimonials/testimonials.module';
import { UploadsModule } from './uploads/uploads.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { SettingsModule } from './settings/settings.module';
import { NewsletterModule } from './newsletter/newsletter.module';
import { MailModule } from './mail/mail.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { RolesGuard } from './common/guards/roles.guard';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { Project } from './projects/entities/project.entity';
import { Category } from './projects/entities/category.entity';
import { Technology } from './projects/entities/technology.entity';
import { Skill } from './skills/entities/skill.entity';
import { Experience } from './experiences/entities/experience.entity';
import { Education } from './education/entities/education.entity';
import { Certificate } from './certificates/entities/certificate.entity';
import { ContactMessage } from './contact/entities/contact-message.entity';
import { Testimonial } from './testimonials/entities/testimonial.entity';
import { Upload } from './uploads/entities/upload.entity';
import { AnalyticsEvent } from './analytics/entities/analytics-event.entity';
import { Settings } from './settings/entities/settings.entity';
import { User } from './users/entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST', 'localhost'),
        port: Number(configService.get<number>('DB_PORT', 5432)),
        username: configService.get<string>('DB_USERNAME', 'postgres'),
        password: configService.get<string>('DB_PASSWORD', 'postgres'),
        database: configService.get<string>('DB_NAME', 'portfolio'),
        entities: [Project, Category, Technology, Skill, Experience, Education, Certificate, ContactMessage, Testimonial, Upload, AnalyticsEvent, Settings, User],
        synchronize: true,
        logging: false,
      }),
    }),
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
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
