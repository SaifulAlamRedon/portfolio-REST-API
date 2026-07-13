import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { Upload } from './entities/upload.entity';

@Injectable()
export class UploadsService {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
    @InjectRepository(Upload)
    private readonly uploadRepository: Repository<Upload>,
  ) {}

  async uploadAvatar(file: any) {
    if (!file) {
      return { success: false, message: 'No file provided' };
    }

    const result = await this.cloudinaryService.uploadImage(file);
    await this.saveUploadRecord(result, 'avatar', 'image', file);
    return result;
  }

  async uploadProjectImages(files: any[]) {
    if (!files?.length) {
      return { success: false, message: 'No files provided' };
    }

    const result = await this.cloudinaryService.uploadImages(files);
    await Promise.all(files.map((file, index) => this.saveUploadRecord({ ...result, file, index }, 'project', 'image', file)));
    return result;
  }

  async uploadCertificate(file: any) {
    if (!file) {
      return { success: false, message: 'No file provided' };
    }

    const result = await this.cloudinaryService.uploadImage(file);
    await this.saveUploadRecord(result, 'certificate', 'image', file);
    return result;
  }

  async uploadResume(file: any) {
    if (!file) {
      return { success: false, message: 'No file provided' };
    }

    const result = await this.cloudinaryService.uploadPdf(file);
    await this.saveUploadRecord(result, 'resume', 'pdf', file);
    return result;
  }

  async deleteFile(id: string) {
    const upload = await this.uploadRepository.findOne({ where: { id }, withDeleted: false });
    if (!upload) {
      return this.cloudinaryService.deleteAsset(id);
    }

    await this.uploadRepository.softDelete(upload.id);
    return this.cloudinaryService.deleteAsset(upload.publicId);
  }

  async replaceFile(id: string, file: any) {
    if (!file) {
      return { success: false, message: 'No file provided' };
    }

    const upload = await this.uploadRepository.findOne({ where: { id }, withDeleted: false });
    if (!upload) {
      return this.cloudinaryService.replaceAsset(id, file);
    }

    const result: any = await this.cloudinaryService.replaceAsset(upload.publicId, file);
    upload.secureUrl = result?.secureUrl || result?.url || upload.secureUrl;
    upload.originalName = file.originalname;
    await this.uploadRepository.save(upload);
    return result;
  }

  optimize() {
    return this.cloudinaryService.optimize();
  }

  private async saveUploadRecord(result: any, category: Upload['category'], resourceType: Upload['resourceType'], file: any) {
    const publicId = result?.publicId || result?.public_id || result?.id || `${category}-${Date.now()}`;
    const secureUrl = result?.secureUrl || result?.url;

    const upload = this.uploadRepository.create({
      category,
      resourceType,
      publicId,
      secureUrl,
      originalName: file?.originalname,
      metadata: JSON.stringify({ fileName: file?.originalname, size: file?.size }),
    });

    await this.uploadRepository.save(upload);
  }
}
