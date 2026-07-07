import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { describe, expect, it, beforeEach } from '@jest/globals';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';


describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn().mockResolvedValue('token'),
            verifyAsync: jest.fn().mockResolvedValue({ sub: 'user-1', email: 'test@example.com' }),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should register a new user', async () => {
    const dto: RegisterDto = {
      name: 'Test User',
      email: 'test@example.com',
      password: '123456',
    };

    const result = await service.register(dto);

    expect(result).toEqual(
      expect.objectContaining({
        message: 'User registered successfully',
      }),
    );
  });
});
