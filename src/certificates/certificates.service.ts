import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCertificateDto } from './dto/create-certificate.dto';
import { UpdateCertificateDto } from './dto/update-certificate.dto';
import { Certificate } from './entities/certificate.entity';

@Injectable()
export class CertificatesService {
  constructor(
    @InjectRepository(Certificate)
    private readonly certificateRepository: Repository<Certificate>,
  ) {}

  async findAll() {
    const certificates = await this.certificateRepository.find({
      withDeleted: false,
      order: { issueDate: 'DESC' },
    });

    return { success: true, message: 'Certificates fetched successfully', data: certificates };
  }

  async create(dto: CreateCertificateDto) {
    const certificate = this.certificateRepository.create({
      title: dto.title,
      issuer: dto.issuer,
      issueDate: dto.issueDate,
      credentialUrl: dto.credentialUrl,
      image: dto.image,
    });

    const saved = await this.certificateRepository.save(certificate);
    return { success: true, message: 'Certificate created successfully', data: saved };
  }

  async update(id: string, dto: UpdateCertificateDto) {
    const certificate = await this.certificateRepository.findOne({
      where: { id },
      withDeleted: false,
    });

    if (!certificate) {
      throw new NotFoundException('Certificate not found');
    }

    Object.assign(certificate, dto);
    const saved = await this.certificateRepository.save(certificate);

    return { success: true, message: 'Certificate updated successfully', data: saved };
  }

  async remove(id: string) {
    const certificate = await this.certificateRepository.findOne({
      where: { id },
      withDeleted: false,
    });

    if (!certificate) {
      throw new NotFoundException('Certificate not found');
    }

    await this.certificateRepository.softDelete(certificate.id);
    return { success: true, message: 'Certificate deleted successfully' };
  }
}
