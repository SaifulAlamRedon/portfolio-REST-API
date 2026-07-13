import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { VerifyTokenDto } from './dto/verify-token.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // POST /auth/register
  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  // POST /auth/login
  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  // POST /auth/refresh
  @Post('refresh')
  refresh(@Body() dto: RefreshTokenDto) {
    return this.authService.refreshToken(dto);
  }

  // POST /auth/logout
  @Post('logout')
  logout(@Body() dto: RefreshTokenDto) {
    return this.authService.logout(dto.refreshToken);
  }

  // GET /auth/me
  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@CurrentUser() user: any) {
    return this.authService.getCurrentUser(user.id);
  }

  // PATCH /auth/change-password
  @UseGuards(JwtAuthGuard)
  @Patch('change-password')
  changePassword(
    @CurrentUser() user: any,
    @Body() dto: ChangePasswordDto,
  ) {
    return this.authService.changePassword(user.id, dto);
  }

  // POST /auth/verify-token
  @Post('verify-token')
  verifyToken(@Body() dto: VerifyTokenDto) {
    return this.authService.verifyToken(dto);
  }

  // POST /auth/validate-credentials
  @Post('validate-credentials')
  validateCredentials(@Body() dto: LoginDto) {
    return this.authService.validateCredentials(dto);
  }

  // POST /auth/generate-tokens
  @Post('generate-tokens')
  generateTokens(@Body('userId') userId: string) {
    return this.authService.generateTokens(userId);
  }
}