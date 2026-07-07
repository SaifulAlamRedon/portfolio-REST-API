import { Controller, Delete, Get, Param, Patch, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from './cloudinary.service';

@Controller('cloudinary')
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post('upload-image')
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(@UploadedFile() file: any) {
    return this.cloudinaryService.uploadImage(file);
  }

  @Post('upload-images')
  @UseInterceptors(FilesInterceptor('files'))
  uploadImages(@UploadedFiles() files: any[]) {
    return this.cloudinaryService.uploadImages(files);
  }

  @Post('upload-pdf')
  @UseInterceptors(FileInterceptor('file'))
  uploadPdf(@UploadedFile() file: any) {
    return this.cloudinaryService.uploadPdf(file);
  }

  @Delete(':publicId')
  deleteAsset(@Param('publicId') publicId: string) {
    return this.cloudinaryService.deleteAsset(publicId);
  }

  @Patch(':publicId')
  @UseInterceptors(FileInterceptor('file'))
  replaceAsset(@Param('publicId') publicId: string, @UploadedFile() file: any) {
    return this.cloudinaryService.replaceAsset(publicId, file);
  }

  @Get('optimize')
  optimize() {
    return this.cloudinaryService.optimize();
  }

  @Get('url/:publicId')
  secureUrl(@Param('publicId') publicId: string) {
    return this.cloudinaryService.generateSecureUrl(publicId);
  }
}
