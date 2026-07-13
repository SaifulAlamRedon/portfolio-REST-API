import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateTestimonialDto } from './dto/create-testimonial.dto';
import { TestimonialsService } from './testimonials.service';

@Controller('testimonials')
export class TestimonialsController {
  constructor(private readonly testimonialsService: TestimonialsService) {}

  @Post()
  submit(@Body() dto: CreateTestimonialDto) {
    return this.testimonialsService.submitTestimonial(dto);
  }

  @Get()
  findAllApproved() {
    return this.testimonialsService.findAllApproved();
  }

  @Patch(':id/approve')
  approve(@Param('id') id: string) {
    return this.testimonialsService.approveTestimonial(id);
  }

  @Patch(':id/reject')
  reject(@Param('id') id: string) {
    return this.testimonialsService.rejectTestimonial(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testimonialsService.deleteTestimonial(id);
  }

  @Get('pending')
  findPending() {
    return this.testimonialsService.findPending();
  }

  @Post(':id/photo')
  @UseInterceptors(FileInterceptor('file'))
  uploadPhoto(@Param('id') id: string, @UploadedFile() file: any) {
    return this.testimonialsService.uploadPhoto(id, file);
  }
}
