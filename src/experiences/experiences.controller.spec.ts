import { Test, TestingModule } from '@nestjs/testing';
import { ExperiencesController } from './experiences.controller';
import { ExperiencesService } from './experiences.service';
import { describe, expect, it, beforeEach } from '@jest/globals';


describe('ExperiencesController', () => {
  let controller: ExperiencesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExperiencesController],
      providers: [
        {
          provide: ExperiencesService,
          useValue: {
            findAll: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ExperiencesController>(ExperiencesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
