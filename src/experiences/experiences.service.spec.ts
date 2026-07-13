import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ExperiencesService } from './experiences.service';
import { Experience } from './entities/experience.entity';
import { Technology } from '../projects/entities/technology.entity';

describe('ExperiencesService', () => {
  let service: ExperiencesService;

  let repository: Partial<
    Record<keyof Repository<Experience>, jest.Mock>
  >;

  let technologyRepository: Partial<
    Record<keyof Repository<Technology>, jest.Mock>
  >;

  beforeEach(async () => {
    repository = {
      find: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      softDelete: jest.fn(),
      restore: jest.fn(),
      createQueryBuilder: jest.fn(),
    };

    technologyRepository = {
      find: jest.fn(),
      findBy: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExperiencesService,
        {
          provide: getRepositoryToken(Experience),
          useValue: repository,
        },
        {
          provide: getRepositoryToken(Technology),
          useValue: technologyRepository,
        },
      ],
    }).compile();

    service = module.get<ExperiencesService>(ExperiencesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return experiences', async () => {
    const experiences = [
      {
        id: '1',
        startDate: new Date('2023-01-01'),
      },
      {
        id: '2',
        startDate: new Date('2024-01-01'),
      },
    ] as Experience[];

    (repository.find as jest.Mock).mockResolvedValue(experiences);

    const result = await service.findAll();

    expect(repository.find).toHaveBeenCalled();
    expect(result.data).toEqual(experiences);
  });
});
