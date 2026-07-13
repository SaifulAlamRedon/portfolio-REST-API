import { Injectable, NotFoundException } from '@nestjs/common';

interface CertificateRecord {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialUrl?: string;
  image?: string;
}

@Injectable()
export class CertificatesService {
  private readonly certificates: CertificateRecord[] = [
    {
      id: 'cert-1',
      title: 'NestJS Fundamentals',
      issuer: 'Udemy',
      issueDate: '2024-05-01',
      credentialUrl: 'https://example.com/cert',
      image: 'https://example.com/cert.png',
    },
  ];

  findAll() {
    return { success: true, message: 'Certificates fetched successfully', data: this.certificates };
  }

  create(dto: any) {
    const item: CertificateRecord = {
      id: `cert-${Date.now()}`,
      title: dto.title,
      issuer: dto.issuer,
      issueDate: dto.issueDate,
      credentialUrl: dto.credentialUrl,
      image: dto.image,
    };
    this.certificates.unshift(item);
    return { success: true, message: 'Certificate created successfully', data: item };
  }

  update(id: string, dto: any) {
    const item = this.certificates.find((entry) => entry.id === id);
    if (!item) {
      throw new NotFoundException('Certificate not found');
    }
    Object.assign(item, dto);
    return { success: true, message: 'Certificate updated successfully', data: item };
  }

  remove(id: string) {
    const index = this.certificates.findIndex((entry) => entry.id === id);
    if (index === -1) {
      throw new NotFoundException('Certificate not found');
    }
    this.certificates.splice(index, 1);
    return { success: true, message: 'Certificate deleted successfully' };
  }
}
