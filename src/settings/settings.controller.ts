import { Body, Controller, Get, Patch, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Public } from '../common/decorators/public.decorator';
import { CreateSettingsDto } from './dto/create-settings.dto';
import { UpdateSettingsDto } from './dto/update-settings.dto';
import { SettingsService } from './settings.service';

@UseGuards(JwtAuthGuard)
@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Public()
  @Get()
  find() {
    return this.settingsService.getSettings();
  }

  @Roles('admin')
  @Patch()
  update(@Body() dto: UpdateSettingsDto) {
    return this.settingsService.updateSettings(dto);
  }

  @Roles('admin')
  @Post('logo')
  @UseInterceptors(FileInterceptor('file'))
  uploadLogo(@UploadedFile() file: any) {
    return this.settingsService.uploadLogo(file);
  }

  @Roles('admin')
  @Post('favicon')
  @UseInterceptors(FileInterceptor('file'))
  uploadFavicon(@UploadedFile() file: any) {
    return this.settingsService.uploadFavicon(file);
  }

  @Roles('admin')
  @Patch('resume')
  updateResume(@Body() dto: UpdateSettingsDto) {
    return this.settingsService.updateResume(dto);
  }

  @Roles('admin')
  @Patch('about')
  updateAbout(@Body() dto: UpdateSettingsDto) {
    return this.settingsService.updateAbout(dto);
  }

  @Roles('admin')
  @Patch('contact')
  updateContact(@Body() dto: UpdateSettingsDto) {
    return this.settingsService.updateContact(dto);
  }

  @Roles('admin')
  @Patch('social-links')
  updateSocialLinks(@Body() dto: UpdateSettingsDto) {
    return this.settingsService.updateSocialLinks(dto);
  }

  @Roles('admin')
  @Patch('theme')
  updateTheme(@Body() dto: UpdateSettingsDto) {
    return this.settingsService.updateTheme(dto);
  }

  @Roles('admin')
  @Post('reset')
  reset() {
    return this.settingsService.resetSettings();
  }
}