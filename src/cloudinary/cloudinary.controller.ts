import { Controller, Delete, Get, Param, Patch, Post, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CloudinaryService } from './cloudinary.service';

@UseGuards(JwtAuthGuard)
@Roles('admin')
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

  @Roles('admin')
  @Delete(':publicId')
  deleteAsset(@Param('publicId') publicId: string) {
    return this.cloudinaryService.deleteAsset(publicId);
  }

  @Roles('admin')
  @Patch(':publicId')
  @UseInterceptors(FileInterceptor('file'))
  replaceAsset(@Param('publicId') publicId: string, @UploadedFile() file: any) {
    return this.cloudinaryService.replaceAsset(publicId, file);
  }

  @Roles('admin')
  @Get('optimize')
  optimize() {
    return this.cloudinaryService.optimize();
  }

  @Roles('admin')
  @Get('url/:publicId')
  secureUrl(@Param('publicId') publicId: string) {
    return this.cloudinaryService.generateSecureUrl(publicId);
  }
}
