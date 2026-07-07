import { Injectable } from '@nestjs/common';

@Injectable()
export class CloudinaryService {
  uploadImage(file: any) {
    return { success: true, type: 'image', fileName: file?.originalname };
  }

  uploadImages(files: any[]) {
    return { success: true, type: 'images', count: files?.length ?? 0 };
  }

  uploadPdf(file: any) {
    return { success: true, type: 'pdf', fileName: file?.originalname };
  }

  deleteAsset(publicId: string) {
    return { success: true, action: 'deleted', publicId };
  }

  replaceAsset(publicId: string, file: any) {
    return { success: true, action: 'replaced', publicId, fileName: file?.originalname };
  }

  optimize() {
    return { success: true, action: 'optimized' };
  }

  generateSecureUrl(publicId: string) {
    return { success: true, url: `https://res.cloudinary.com/demo/image/upload/${encodeURIComponent(publicId)}` };
  }
}
