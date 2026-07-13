import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UpdateBioDto } from './dto/update-bio.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UpdateSocialLinksDto } from './dto/update-social-links.dto';
import { UsersService } from './users.service';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  getProfile(@CurrentUser() user: any) {
    return this.usersService.getProfile(user.id);
  }

  @Patch('profile')
  updateProfile(@CurrentUser() user: any, @Body() dto: UpdateProfileDto) {
    return this.usersService.updateProfile(user.id, dto);
  }

  @Post('avatar')
  @UseInterceptors(FileInterceptor('file'))
  uploadAvatar(@CurrentUser() user: any, @UploadedFile() file: any) {
    return this.usersService.uploadAvatar(user.id, file);
  }

  @Delete('avatar')
  removeAvatar(@CurrentUser() user: any) {
    return this.usersService.removeAvatar(user.id);
  }

  @Patch('change-password')
  changePassword(@CurrentUser() user: any, @Body() dto: ChangePasswordDto) {
    return this.usersService.changePassword(user.id, dto);
  }

  @Patch('social-links')
  updateSocialLinks(@CurrentUser() user: any, @Body() dto: UpdateSocialLinksDto) {
    return this.usersService.updateSocialLinks(user.id, dto);
  }

  @Patch('bio')
  updateBio(@CurrentUser() user: any, @Body() dto: UpdateBioDto) {
    return this.usersService.updateBio(user.id, dto);
  }

  @Patch('location')
  updateLocation(@CurrentUser() user: any, @Body() dto: UpdateLocationDto) {
    return this.usersService.updateLocation(user.id, dto);
  }
}
