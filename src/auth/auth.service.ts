import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ChangePasswordDto } from './dto/change-password.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { RegisterDto } from './dto/register.dto';
import { VerifyTokenDto } from './dto/verify-token.dto';

interface UserRecord {
  id: string;
  name: string;
  email: string;
  password: string;
  refreshToken?: string;
  role?: string;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class AuthService {
  private readonly users: UserRecord[] = [];

  constructor(private readonly jwtService: JwtService) {}

  async register(dto: RegisterDto) {
    if (!dto.name || !dto.email || !dto.password) {
      throw new BadRequestException('Name, email and password are required');
    }

    const existingUser = this.users.find((user) => user.email === dto.email);
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user: UserRecord = {
      id: `user-${Date.now()}`,
      name: dto.name,
      email: dto.email,
      password: hashedPassword,
      role: 'user',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.users.push(user);

    const tokens = await this.generateTokens(user.id, user.email, user.role);
    const refreshTokenHash = await bcrypt.hash(tokens.refreshToken, 10);
    user.refreshToken = refreshTokenHash;

    return {
      message: 'User registered successfully',
      user: this.getPublicUser(user),
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }

  async login(dto: LoginDto) {
    const user = this.users.find((item) => item.email === dto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const tokens = await this.generateTokens(user.id, user.email, user.role);
    const refreshTokenHash = await bcrypt.hash(tokens.refreshToken, 10);
    user.refreshToken = refreshTokenHash;

    return {
      message: 'Login successful',
      user: this.getPublicUser(user),
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }

  async refreshToken(dto: RefreshTokenDto) {
    const user = this.users.find((item) => !!item.refreshToken);
    if (!user || !user.refreshToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const isValidRefreshToken = await bcrypt.compare(dto.refreshToken, user.refreshToken);
    if (!isValidRefreshToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const tokens = await this.generateTokens(user.id, user.email, user.role);
    const refreshTokenHash = await bcrypt.hash(tokens.refreshToken, 10);
    user.refreshToken = refreshTokenHash;

    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }

  async logout(refreshToken: string) {
    const user = this.users.find((item) => !!item.refreshToken);
    if (!user) {
      throw new NotFoundException('No active session found');
    }

    const isValidRefreshToken = await bcrypt.compare(refreshToken, user.refreshToken ?? '');
    if (!isValidRefreshToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    user.refreshToken = undefined;

    return {
      message: 'Logout successful',
    };
  }

  async getCurrentUser(userId: string) {
    const user = this.users.find((item) => item.id === userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.getPublicUser(user);
  }

  async changePassword(userId: string, dto: ChangePasswordDto) {
    const user = this.users.find((item) => item.id === userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (dto.newPassword !== dto.confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }

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

  async verifyToken(dto: VerifyTokenDto) {
    try {
      const payload = await this.jwtService.verifyAsync(dto.token);
      return {
        valid: true,
        user: {
          id: payload.sub,
          email: payload.email,
        },
      };
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async validateCredentials(dto: LoginDto) {
    const user = this.users.find((item) => item.email === dto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return {
      valid: true,
      user: this.getPublicUser(user),
    };
  }

  async generateTokens(userId: string, email?: string, role?: string) {
    const tokenEmail = email ?? userId;
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync({ sub: userId, email: tokenEmail, role: role ?? 'user' }),
      this.jwtService.signAsync({ sub: userId, email: tokenEmail, role: role ?? 'user' }, { expiresIn: '7d' }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  private getPublicUser(user: UserRecord) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }
}