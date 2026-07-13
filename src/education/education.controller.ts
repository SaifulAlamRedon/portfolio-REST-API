import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';
import { EducationService } from './education.service';

@Controller('education')
export class EducationController {
  constructor(private readonly educationService: EducationService) {}

  @Get()
  findAll(): any {
    return this.educationService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateEducationDto): any {
    return this.educationService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateEducationDto): any {
    return this.educationService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string): any {
    return this.educationService.remove(id);
  }
}
