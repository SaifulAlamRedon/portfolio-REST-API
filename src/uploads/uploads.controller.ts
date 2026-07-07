import { Controller, Delete, Get, Param, Patch, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { UploadsService } from './uploads.service';

@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @Post('avatar')
  @UseInterceptors(FileInterceptor('file'))
  uploadAvatar(@UploadedFile() file: any) {
    return this.uploadsService.uploadAvatar(file);
  }

  @Post('project-images')
  @UseInterceptors(FilesInterceptor('files'))
  uploadProjectImages(@UploadedFiles() files: any[]) {
    return this.uploadsService.uploadProjectImages(files);
  }

  @Post('certificate')
  @UseInterceptors(FileInterceptor('file'))
  uploadCertificate(@UploadedFile() file: any) {
    return this.uploadsService.uploadCertificate(file);
  }

  @Post('resume')
  @UseInterceptors(FileInterceptor('file'))
  uploadResume(@UploadedFile() file: any) {
    return this.uploadsService.uploadResume(file);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.uploadsService.deleteFile(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  replace(@Param('id') id: string, @UploadedFile() file: any) {
    return this.uploadsService.replaceFile(id, file);
  }

  @Get('optimize')
  optimize() {
    return this.uploadsService.optimize();
  }
}
