import { Controller, Delete, Get, Param, Patch, Post, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UploadsService } from './uploads.service';

@UseGuards(JwtAuthGuard)
@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @Roles('admin')
  @Post('avatar')
  @UseInterceptors(FileInterceptor('file'))
  uploadAvatar(@UploadedFile() file: any) {
    return this.uploadsService.uploadAvatar(file);
  }

  @Roles('admin')
  @Post('project-images')
  @UseInterceptors(FilesInterceptor('files'))
  uploadProjectImages(@UploadedFiles() files: any[]) {
    return this.uploadsService.uploadProjectImages(files);
  }

  @Roles('admin')
  @Post('certificate')
  @UseInterceptors(FileInterceptor('file'))
  uploadCertificate(@UploadedFile() file: any) {
    return this.uploadsService.uploadCertificate(file);
  }

  @Roles('admin')
  @Post('resume')
  @UseInterceptors(FileInterceptor('file'))
  uploadResume(@UploadedFile() file: any) {
    return this.uploadsService.uploadResume(file);
  }

  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.uploadsService.deleteFile(id);
  }

  @Roles('admin')
  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  replace(@Param('id') id: string, @UploadedFile() file: any) {
    return this.uploadsService.replaceFile(id, file);
  }

  @Roles('admin')
  @Get('optimize')
  optimize() {
    return this.uploadsService.optimize();
  }
}
