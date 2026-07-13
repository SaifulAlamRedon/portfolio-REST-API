import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UpdateBioDto } from './dto/update-bio.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UpdateSocialLinksDto } from './dto/update-social-links.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getProfile(userId: string) {
    const user = await this.findUserById(userId);
    return this.toPublicUser(user);
  }

  async updateProfile(userId: string, dto: UpdateProfileDto) {
    const user = await this.findUserById(userId);
    const nextName = dto.fullName ?? dto.name;
    if (nextName !== undefined) user.fullName = nextName;
    if (dto.bio !== undefined) user.bio = dto.bio;
    if (dto.location !== undefined) user.location = dto.location;

    const saved = await this.userRepository.save(user);
    return this.toPublicUser(saved);
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

    const user = await this.findUserById(userId);
    user.avatar = `/uploads/${file.filename}`;
    const saved = await this.userRepository.save(user);
    return this.toPublicUser(saved);
  }

  async removeAvatar(userId: string) {
    const user = await this.findUserById(userId);
    user.avatar = undefined;
    await this.userRepository.save(user);
    return {
      message: 'Avatar removed successfully',
    };
  }

  async changePassword(userId: string, dto: ChangePasswordDto) {
    const user = await this.findUserById(userId);
    const isCurrentPasswordValid = await bcrypt.compare(dto.currentPassword, user.password);
    if (!isCurrentPasswordValid) {
      throw new UnauthorizedException('Current password is incorrect');
    }

    user.password = await bcrypt.hash(dto.newPassword, 10);
    await this.userRepository.save(user);
    return {
      message: 'Password changed successfully',
    };
  }

  async updateSocialLinks(userId: string, dto: UpdateSocialLinksDto) {
    const user = await this.findUserById(userId);
    const nextGithub = dto.github ?? dto.githubUrl;
    const nextLinkedin = dto.linkedin ?? dto.linkedinUrl;
    const nextPortfolio = dto.portfolio ?? dto.portfolioUrl;

    if (nextGithub !== undefined) user.github = nextGithub;
    if (nextLinkedin !== undefined) user.linkedin = nextLinkedin;
    if (nextPortfolio !== undefined) user.portfolio = nextPortfolio;

    const saved = await this.userRepository.save(user);
    return this.toPublicUser(saved);
  }

  async updateBio(userId: string, dto: UpdateBioDto) {
    const user = await this.findUserById(userId);
    user.bio = dto.bio;
    const saved = await this.userRepository.save(user);
    return this.toPublicUser(saved);
  }

  async updateLocation(userId: string, dto: UpdateLocationDto) {
    const user = await this.findUserById(userId);
    user.location = dto.location;
    const saved = await this.userRepository.save(user);
    return this.toPublicUser(saved);
  }

  private async findUserById(userId: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  private toPublicUser(user: User) {
    return {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      avatar: user.avatar,
      bio: user.bio,
      location: user.location,
      github: user.github,
      linkedin: user.linkedin,
      portfolio: user.portfolio,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
