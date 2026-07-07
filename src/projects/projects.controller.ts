import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards, UploadedFiles, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get('search')
  search(@Query('q') q?: string, @Query('page') page?: number, @Query('limit') limit?: number): any {
    return this.projectsService.findAll({ page, limit, search: q });
  }

  @Get('filter')
  filter(
    @Query('category') category?: string,
    @Query('technology') technology?: string,
    @Query('featured') featured?: string,
    @Query('status') status?: string,
  ): any {
    return this.projectsService.findAll({ category, technology, featured, status });
  }

  @Get('technology/:name')
  findByTechnology(@Param('name') name: string): any {
    return this.projectsService.findAll({ technology: name });
  }

  @Get('sort')
  sort(@Query('by') by?: string, @Query('order') order?: string): any {
    return this.projectsService.findAll({ sortBy: by, sortOrder: order });
  }

  @Get()
  findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('search') search?: string,
    @Query('category') category?: string,
    @Query('technology') technology?: string,
    @Query('featured') featured?: string,
    @Query('status') status?: string,
  ): any {
    return this.projectsService.findAll({ page, limit, search, category, technology, featured, status });
  }

  @Get('featured')
  featured(): any {
    return this.projectsService.featured();
  }

  @Get(':id')
  findOne(@Param('id') id: string): any {
    return this.projectsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateProjectDto): any {
    return this.projectsService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateProjectDto): any {
    return this.projectsService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string): any {
    return this.projectsService.remove(id);
  }

  @Post(':id/view')
  incrementViewPost(@Param('id') id: string): any {
    return this.projectsService.incrementView(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/restore')
  restore(@Param('id') id: string): any {
    return this.projectsService.restore(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/publish')
  publish(@Param('id') id: string): any {
    return this.projectsService.publish(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/unpublish')
  unpublish(@Param('id') id: string): any {
    return this.projectsService.unpublish(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/archive')
  archive(@Param('id') id: string): any {
    return this.projectsService.archive(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/duplicate')
  duplicate(@Param('id') id: string): any {
    return this.projectsService.duplicate(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/featured')
  toggleFeatured(@Param('id') id: string): any {
    return this.projectsService.toggleFeatured(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/images')
  @UseInterceptors(FilesInterceptor('files'))
  uploadImages(@Param('id') id: string, @UploadedFiles() files: any[]): any {
    return this.projectsService.uploadImages(id, files);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/technologies')
  updateTechnologies(@Param('id') id: string, @Body('technologies') technologies: string[]): any {
    return this.projectsService.updateTechnologies(id, technologies);
  }
}
