import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';

@Injectable()
export class CloudinaryService {
  constructor(private readonly configService: ConfigService) {
    cloudinary.config({
      cloud_name: this.configService.get<string>('CLOUDINARY_CLOUD_NAME'),
      api_key: this.configService.get<string>('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get<string>('CLOUDINARY_API_SECRET'),
      secure: true,
    });
  }

  private uploadStream(file: any, folder?: string) {
    return new Promise<any>((resolve, reject) => {
      const uploadOptions: Record<string, any> = {
        resource_type: 'auto',
      };

      if (folder) {
        uploadOptions.folder = folder;
      }

      const stream = cloudinary.uploader.upload_stream(uploadOptions, (error, result) => {
        if (error) {
          console.error('Cloudinary upload_stream error:', error);
          return reject(error);
        }
        resolve(result);
      });

      streamifier.createReadStream(file.buffer).pipe(stream);
    });
  }

  async uploadImage(file: any) {
    if (!file?.buffer) {
      throw new InternalServerErrorException('No file buffer provided for upload.');
    }

    try {
      const result = await this.uploadStream(file, 'portfolio/images');
      return { success: true, data: result };
    } catch (error: any) {
      console.error('Cloudinary uploadImage error:', error?.message || error);
      throw new InternalServerErrorException(`Cloudinary upload failed: ${error?.message || 'unknown error'}`);
    }
  }

  async uploadImages(files: any[]) {
    if (!files?.length) {
      throw new InternalServerErrorException('No files provided for upload.');
    }
    const uploads = await Promise.all(files.map((file) => this.uploadStream(file, 'portfolio/images')));
    return { success: true, data: uploads };
  }

  async uploadPdf(file: any) {
    if (!file?.buffer) {
      throw new InternalServerErrorException('No file buffer provided for upload.');
    }
    const result = await this.uploadStream(file, 'portfolio/pdfs');
    return { success: true, data: result };
  }

  async deleteAsset(publicId: string) {
    const result = await cloudinary.uploader.destroy(publicId);
    return { success: true, data: result };
  }

  async replaceAsset(publicId: string, file: any) {
    if (!file?.buffer) {
      throw new InternalServerErrorException('No file buffer provided for upload.');
    }
    await this.deleteAsset(publicId);
    const result = await this.uploadStream(file, 'portfolio/images');
    return { success: true, data: result };
  }

  async optimize() {
    const result = await cloudinary.api.resources({ max_results: 10 });
    return { success: true, data: result };
  }

  generateSecureUrl(publicId: string) {
    const url = cloudinary.url(publicId, { secure: true });
    return { success: true, url };
  }
}
