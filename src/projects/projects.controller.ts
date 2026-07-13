import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Public } from '../common/decorators/public.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { CreateProjectDto } from './dto/create-project.dto';
import { QueryProjectsDto } from './dto/query-projects.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Public()
  @Get('search')
  search(@Query() query: QueryProjectsDto): any {
    return this.projectsService.findAll(query);
  }

  @Public()
  @Get('filter')
  filter(@Query() query: QueryProjectsDto): any {
    return this.projectsService.findAll(query);
  }

  @Public()
  @Get('technology/:name')
  findByTechnology(@Param('name') name: string): any {
    return this.projectsService.findAll({ technology: name });
  }

  @Public()
  @Get('sort')
  sort(@Query() query: QueryProjectsDto): any {
    return this.projectsService.findAll(query);
  }

  @Public()
  @Get()
  findAll(@Query() query: QueryProjectsDto): any {
    return this.projectsService.findAll(query);
  }

  @Public()
  @Get('featured')
  featured(): any {
    return this.projectsService.featured();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string): any {
    return this.projectsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  @Post()
  create(@Body() dto: CreateProjectDto): any {
    return this.projectsService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateProjectDto): any {
    return this.projectsService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: string): any {
    return this.projectsService.remove(id);
  }

  @Public()
  @Post(':id/view')
  incrementViewPost(@Param('id') id: string): any {
    return this.projectsService.incrementView(id);
  }

  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  @Patch(':id/restore')
  restore(@Param('id') id: string): any {
    return this.projectsService.restore(id);
  }

  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  @Patch(':id/publish')
  publish(@Param('id') id: string): any {
    return this.projectsService.publish(id);
  }

  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  @Patch(':id/unpublish')
  unpublish(@Param('id') id: string): any {
    return this.projectsService.unpublish(id);
  }

  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  @Patch(':id/archive')
  archive(@Param('id') id: string): any {
    return this.projectsService.archive(id);
  }

  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  @Post(':id/duplicate')
  duplicate(@Param('id') id: string): any {
    return this.projectsService.duplicate(id);
  }

  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  @Patch(':id/featured')
  toggleFeatured(@Param('id') id: string): any {
    return this.projectsService.toggleFeatured(id);
  }

  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  @Post(':id/images')
  @UseInterceptors(FilesInterceptor('files'))
  uploadImages(@Param('id') id: string, @UploadedFiles() files: any[]): any {
    return this.projectsService.uploadImages(id, files);
  }

  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  @Patch(':id/technologies')
  updateTechnologies(@Param('id') id: string, @Body('technologies') technologies: string[]): any {
    return this.projectsService.updateTechnologies(id, technologies);
  }
}
