import { Injectable } from '@nestjs/common';
import { CreateTestimonialDto } from './dto/create-testimonial.dto';

@Injectable()
export class TestimonialsService {
  submitTestimonial(dto: CreateTestimonialDto) {
    return { status: 'submitted', data: dto };
  }

  findAllApproved() {
    return { status: 'approved_list', data: [] };
  }

  approveTestimonial(id: string) {
    return { status: 'approved', id };
  }

  rejectTestimonial(id: string) {
    return { status: 'rejected', id };
  }

  deleteTestimonial(id: string) {
    return { status: 'deleted', id };
  }

  findPending() {
    return { status: 'pending_list', data: [] };
  }

  uploadPhoto(id: string, file: any) {
    return { status: 'photo_uploaded', id, fileName: file?.originalname };
  }
}
