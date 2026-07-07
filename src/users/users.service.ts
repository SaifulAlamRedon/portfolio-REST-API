import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthService } from '../auth/auth.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UpdateBioDto } from './dto/update-bio.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UpdateSocialLinksDto } from './dto/update-social-links.dto';

interface UserRecord {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar?: string;
  bio?: string;
  location?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class UsersService {
  constructor(private readonly authService: AuthService) {}

  async getProfile(userId: string) {
    const user = this.findUserById(userId);
    return this.toPublicUser(user);
  }

  async updateProfile(userId: string, dto: UpdateProfileDto) {
    const user = this.findUserById(userId);
    if (dto.name !== undefined) user.name = dto.name;
    if (dto.bio !== undefined) user.bio = dto.bio;
    if (dto.location !== undefined) user.location = dto.location;
    user.updatedAt = new Date();
    return this.toPublicUser(user);
  }

  async uploadAvatar(userId: string, file: any) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.mimetype)) {
      throw new BadRequestException('Only jpg, jpeg, png and webp files are allowed');
    }

    if (file.size > 2 * 1024 * 1024) {
      throw new BadRequestException('File size must be less than 2MB');
    }

    const user = this.findUserById(userId);
    user.avatar = `/uploads/${file.filename}`;
    user.updatedAt = new Date();
    return this.toPublicUser(user);
  }

  async removeAvatar(userId: string) {
    const user = this.findUserById(userId);
    user.avatar = undefined;
    user.updatedAt = new Date();
    return {
      message: 'Avatar removed successfully',
    };
  }

  async changePassword(userId: string, dto: ChangePasswordDto) {
    const user = this.findUserById(userId);
    const isCurrentPasswordValid = await bcrypt.compare(dto.currentPassword, user.password);
    if (!isCurrentPasswordValid) {
      throw new UnauthorizedException('Current password is incorrect');
    }

    user.password = await bcrypt.hash(dto.newPassword, 10);
    user.updatedAt = new Date();
    return {
      message: 'Password changed successfully',
    };
  }

  async updateSocialLinks(userId: string, dto: UpdateSocialLinksDto) {
    const user = this.findUserById(userId);
    if (dto.githubUrl !== undefined) user.githubUrl = dto.githubUrl;
    if (dto.linkedinUrl !== undefined) user.linkedinUrl = dto.linkedinUrl;
    if (dto.portfolioUrl !== undefined) user.portfolioUrl = dto.portfolioUrl;
    user.updatedAt = new Date();
    return this.toPublicUser(user);
  }

  async updateBio(userId: string, dto: UpdateBioDto) {
    const user = this.findUserById(userId);
    user.bio = dto.bio;
    user.updatedAt = new Date();
    return this.toPublicUser(user);
  }

  async updateLocation(userId: string, dto: UpdateLocationDto) {
    const user = this.findUserById(userId);
    user.location = dto.location;
    user.updatedAt = new Date();
    return this.toPublicUser(user);
  }

  private findUserById(userId: string) {
    const authUsers = (this.authService as any).users as UserRecord[] | undefined;
    const user = authUsers?.find((item) => item.id === userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  private toPublicUser(user: UserRecord) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      bio: user.bio,
      location: user.location,
      githubUrl: user.githubUrl,
      linkedinUrl: user.linkedinUrl,
      portfolioUrl: user.portfolioUrl,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
