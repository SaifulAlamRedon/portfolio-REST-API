import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Public } from '../common/decorators/public.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { ExperiencesService } from './experiences.service';

@Controller('experiences')
export class ExperiencesController {
  constructor(private readonly experiencesService: ExperiencesService) {}

  @Public()
  @Get()
  findAll(): any {
    return this.experiencesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  @Post()
  create(@Body() dto: CreateExperienceDto): any {
    return this.experiencesService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateExperienceDto): any {
    return this.experiencesService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: string): any {
    return this.experiencesService.remove(id);
  }
}
