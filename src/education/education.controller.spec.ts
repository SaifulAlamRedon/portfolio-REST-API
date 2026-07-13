import { Test, TestingModule } from '@nestjs/testing';
import { EducationController } from './education.controller';
import { EducationService } from './education.service';
import { describe, expect, it, beforeEach } from '@jest/globals';


describe('EducationController', () => {
  let controller: EducationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EducationController],
      providers: [
        {
          provide: EducationService,
          useValue: {
            findAll: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<EducationController>(EducationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
