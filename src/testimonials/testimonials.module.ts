import { Module } from '@nestjs/common';
import { TestimonialsService } from './testimonials.service';

@Module({
  providers: [TestimonialsService]
})
export class TestimonialsModule {}
