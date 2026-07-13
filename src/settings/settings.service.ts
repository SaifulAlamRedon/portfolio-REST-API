import { Injectable } from '@nestjs/common';
import { UpdateSettingsDto } from './dto/update-settings.dto';

@Injectable()
export class SettingsService {
  getSettings() {
    return { status: 'settings', data: {} };
  }

  updateSettings(dto: UpdateSettingsDto) {
    return { status: 'updated', data: dto };
  }

  uploadLogo(file: any) {
    return { status: 'logo_uploaded', fileName: file?.originalname };
  }

  uploadFavicon(file: any) {
    return { status: 'favicon_uploaded', fileName: file?.originalname };
  }

  updateResume(dto: UpdateSettingsDto) {
    return { status: 'resume_updated', data: dto };
  }

  updateAbout(dto: UpdateSettingsDto) {
    return { status: 'about_updated', data: dto };
  }

  updateContact(dto: UpdateSettingsDto) {
    return { status: 'contact_updated', data: dto };
  }

  updateSocialLinks(dto: UpdateSettingsDto) {
    return { status: 'social_links_updated', data: dto };
  }

  updateTheme(dto: UpdateSettingsDto) {
    return { status: 'theme_updated', data: dto };
  }

  resetSettings() {
    return { status: 'reset' };
  }
}
