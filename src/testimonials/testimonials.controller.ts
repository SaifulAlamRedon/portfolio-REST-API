import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Public } from '../common/decorators/public.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { CreateTestimonialDto } from './dto/create-testimonial.dto';
import { TestimonialsService } from './testimonials.service';

@Controller('testimonials')
export class TestimonialsController {
  constructor(private readonly testimonialsService: TestimonialsService) {}

  @Public()
  @Post()
  submit(@Body() dto: CreateTestimonialDto) {
    return this.testimonialsService.submitTestimonial(dto);
  }

  @Public()
  @Get()
  findAllApproved() {
    return this.testimonialsService.findAllApproved();
  }

  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  @Patch(':id/approve')
  approve(@Param('id') id: string) {
    return this.testimonialsService.approveTestimonial(id);
  }

  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  @Patch(':id/reject')
  reject(@Param('id') id: string) {
    return this.testimonialsService.rejectTestimonial(id);
  }

  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testimonialsService.deleteTestimonial(id);
  }

  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  @Get('pending')
  findPending() {
    return this.testimonialsService.findPending();
  }

  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  @Post(':id/photo')
  @UseInterceptors(FileInterceptor('file'))
  uploadPhoto(@Param('id') id: string, @UploadedFile() file: any) {
    return this.testimonialsService.uploadPhoto(id, file);
  }
}
