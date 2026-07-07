import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { describe, expect, it, beforeEach } from '@jest/globals';


describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            getProfile: jest.fn(),
            updateProfile: jest.fn(),
            uploadAvatar: jest.fn(),
            removeAvatar: jest.fn(),
            changePassword: jest.fn(),
            updateSocialLinks: jest.fn(),
            updateBio: jest.fn(),
            updateLocation: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
