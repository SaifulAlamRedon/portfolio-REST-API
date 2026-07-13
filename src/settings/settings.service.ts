import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateSettingsDto } from './dto/update-settings.dto';
import { Settings } from './entities/settings.entity';

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(Settings)
    private readonly settingsRepository: Repository<Settings>,
  ) {}

  async getSettings() {
    const settings = await this.getOrCreateSettings();
    return { success: true, message: 'Settings fetched successfully', data: settings };
  }

  async updateSettings(dto: UpdateSettingsDto) {
    const settings = await this.getOrCreateSettings();
    Object.assign(settings, dto);
    const saved = await this.settingsRepository.save(settings);
    return { success: true, message: 'Settings updated successfully', data: saved };
  }

  async uploadLogo(file: any) {
    const settings = await this.getOrCreateSettings();
    settings.logo = file?.path || file?.filename || file?.originalname;
    const saved = await this.settingsRepository.save(settings);
    return { success: true, message: 'Logo uploaded successfully', data: saved };
  }

  async uploadFavicon(file: any) {
    const settings = await this.getOrCreateSettings();
    settings.favicon = file?.path || file?.filename || file?.originalname;
    const saved = await this.settingsRepository.save(settings);
    return { success: true, message: 'Favicon uploaded successfully', data: saved };
  }

  async updateResume(dto: UpdateSettingsDto) {
    const settings = await this.getOrCreateSettings();
    settings.resumeUrl = dto.resumeUrl;
    const saved = await this.settingsRepository.save(settings);
    return { success: true, message: 'Resume URL updated successfully', data: saved };
  }

  async updateAbout(dto: UpdateSettingsDto) {
    const settings = await this.getOrCreateSettings();
    settings.aboutMe = dto.aboutMe;
    const saved = await this.settingsRepository.save(settings);
    return { success: true, message: 'About section updated successfully', data: saved };
  }

  async updateContact(dto: UpdateSettingsDto) {
    const settings = await this.getOrCreateSettings();
    settings.contactEmail = dto.contactEmail;
    settings.phone = dto.phone;
    settings.address = dto.address;
    const saved = await this.settingsRepository.save(settings);
    return { success: true, message: 'Contact information updated successfully', data: saved };
  }

  async updateSocialLinks(dto: UpdateSettingsDto) {
    const settings = await this.getOrCreateSettings();
    settings.github = dto.github;
    settings.linkedIn = dto.linkedIn;
    settings.facebook = dto.facebook;
    settings.twitter = dto.twitter;
    const saved = await this.settingsRepository.save(settings);
    return { success: true, message: 'Social links updated successfully', data: saved };
  }

  async updateTheme(dto: UpdateSettingsDto) {
    const settings = await this.getOrCreateSettings();
    settings.themeColor = dto.themeColor;
    const saved = await this.settingsRepository.save(settings);
    return { success: true, message: 'Theme updated successfully', data: saved };
  }

  async resetSettings() {
    const settings = await this.getOrCreateSettings();
    this.settingsRepository.remove(settings);
    return { success: true, message: 'Settings reset successfully' };
  }

  private async getOrCreateSettings() {
    let settings = await this.settingsRepository.findOne({ where: {} });

    if (!settings) {
      settings = this.settingsRepository.create({
        siteName: 'Portfolio',
      });
      await this.settingsRepository.save(settings);
    }

    return settings;
  }
}
