import { Test, TestingModule } from '@nestjs/testing';
import { describe, expect, it, beforeEach } from '@jest/globals';

import { ExperiencesService } from './experiences.service';

describe('ExperiencesService', () => {
  let service: ExperiencesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExperiencesService],
    }).compile();

    service = module.get<ExperiencesService>(ExperiencesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
