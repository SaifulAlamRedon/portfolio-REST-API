import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Public } from '../common/decorators/public.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { SkillsService } from './skills.service';

@UseGuards(JwtAuthGuard)
@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Public()
  @Get()
  findAll(): any {
    return this.skillsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  @Post()
  create(@Body() dto: CreateSkillDto): any {
    return this.skillsService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateSkillDto): any {
    return this.skillsService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: string): any {
    return this.skillsService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  @Patch('reorder')
  reorder(@Body() items: Array<{ id: string; displayOrder: number }>): any {
    return this.skillsService.reorder(items);
  }
}
