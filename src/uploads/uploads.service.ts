import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadsService {
  uploadAvatar(file: any) {
    return { status: 'avatar_uploaded', fileName: file?.originalname };
  }

  uploadProjectImages(files: any[]) {
    return { status: 'project_images_uploaded', count: files?.length ?? 0 };
  }

  uploadCertificate(file: any) {
    return { status: 'certificate_uploaded', fileName: file?.originalname };
  }

  uploadResume(file: any) {
    return { status: 'resume_uploaded', fileName: file?.originalname };
  }

  deleteFile(id: string) {
    return { status: 'deleted', id };
  }

  replaceFile(id: string, file: any) {
    return { status: 'replaced', id, fileName: file?.originalname };
  }

  optimize() {
    return { status: 'optimized' };
  }
}
