import { Body, Controller, Get, Patch, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateSettingsDto } from './dto/create-settings.dto';
import { UpdateSettingsDto } from './dto/update-settings.dto';
import { SettingsService } from './settings.service';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  find() {
    return this.settingsService.getSettings();
  }

  @Patch()
  update(@Body() dto: UpdateSettingsDto) {
    return this.settingsService.updateSettings(dto);
  }

  @Post('logo')
  @UseInterceptors(FileInterceptor('file'))
  uploadLogo(@UploadedFile() file: any) {
    return this.settingsService.uploadLogo(file);
  }

  @Post('favicon')
  @UseInterceptors(FileInterceptor('file'))
  uploadFavicon(@UploadedFile() file: any) {
    return this.settingsService.uploadFavicon(file);
  }

  @Patch('resume')
  updateResume(@Body() dto: UpdateSettingsDto) {
    return this.settingsService.updateResume(dto);
  }

  @Patch('about')
  updateAbout(@Body() dto: UpdateSettingsDto) {
    return this.settingsService.updateAbout(dto);
  }

  @Patch('contact')
  updateContact(@Body() dto: UpdateSettingsDto) {
    return this.settingsService.updateContact(dto);
  }

  @Patch('social-links')
  updateSocialLinks(@Body() dto: UpdateSettingsDto) {
    return this.settingsService.updateSocialLinks(dto);
  }

  @Patch('theme')
  updateTheme(@Body() dto: UpdateSettingsDto) {
    return this.settingsService.updateTheme(dto);
  }

  @Post('reset')
  reset() {
    return this.settingsService.resetSettings();
  }
}
