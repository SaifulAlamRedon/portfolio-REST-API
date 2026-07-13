import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTestimonialDto } from './dto/create-testimonial.dto';
import { Testimonial } from './entities/testimonial.entity';

@Injectable()
export class TestimonialsService {
  constructor(
    @InjectRepository(Testimonial)
    private readonly testimonialRepository: Repository<Testimonial>,
  ) {}

  async submitTestimonial(dto: CreateTestimonialDto) {
    const testimonial = this.testimonialRepository.create({
      name: dto.name,
      company: dto.company,
      designation: dto.designation,
      photo: dto.photo,
      rating: dto.rating ?? 5,
      message: dto.message,
      approved: dto.approved ?? false,
    });

    const saved = await this.testimonialRepository.save(testimonial);
    return { success: true, message: 'Testimonial submitted successfully', data: saved };
  }

  async findAllApproved() {
    const testimonials = await this.testimonialRepository.find({
      where: { approved: true },
      order: { createdAt: 'DESC' },
      withDeleted: false,
    });

    return { success: true, message: 'Approved testimonials fetched successfully', data: testimonials };
  }

  async approveTestimonial(id: string) {
    const testimonial = await this.testimonialRepository.findOne({
      where: { id },
      withDeleted: false,
    });

    if (!testimonial) {
      throw new NotFoundException('Testimonial not found');
    }

    testimonial.approved = true;
    const saved = await this.testimonialRepository.save(testimonial);

    return { success: true, message: 'Testimonial approved successfully', data: saved };
  }

  async rejectTestimonial(id: string) {
    const testimonial = await this.testimonialRepository.findOne({
      where: { id },
      withDeleted: false,
    });

    if (!testimonial) {
      throw new NotFoundException('Testimonial not found');
    }

    testimonial.approved = false;
    const saved = await this.testimonialRepository.save(testimonial);

    return { success: true, message: 'Testimonial rejected successfully', data: saved };
  }

  async deleteTestimonial(id: string) {
    const testimonial = await this.testimonialRepository.findOne({
      where: { id },
      withDeleted: false,
    });

    if (!testimonial) {
      throw new NotFoundException('Testimonial not found');
    }

    await this.testimonialRepository.softDelete(testimonial.id);
    return { success: true, message: 'Testimonial deleted successfully' };
  }

  async findPending() {
    const testimonials = await this.testimonialRepository.find({
      where: { approved: false },
      order: { createdAt: 'ASC' },
      withDeleted: false,
    });

    return { success: true, message: 'Pending testimonials fetched successfully', data: testimonials };
  }

  async uploadPhoto(id: string, file: any) {
    const testimonial = await this.testimonialRepository.findOne({
      where: { id },
      withDeleted: false,
    });

    if (!testimonial) {
      throw new NotFoundException('Testimonial not found');
    }

    testimonial.photo = file?.path || file?.filename || file?.originalname;
    const saved = await this.testimonialRepository.save(testimonial);

    return { success: true, message: 'Photo uploaded successfully', data: saved };
  }
}
