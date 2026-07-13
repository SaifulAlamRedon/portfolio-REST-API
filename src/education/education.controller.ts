import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Public } from '../common/decorators/public.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';
import { EducationService } from './education.service';

@UseGuards(JwtAuthGuard)
@Controller('education')
export class EducationController {
  constructor(private readonly educationService: EducationService) {}

  @Public()
  @Get()
  findAll(): any {
    return this.educationService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  @Post()
  create(@Body() dto: CreateEducationDto): any {
    return this.educationService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateEducationDto): any {
    return this.educationService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: string): any {
    return this.educationService.remove(id);
  }
}
