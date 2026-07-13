import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Public } from '../common/decorators/public.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { CreateCertificateDto } from './dto/create-certificate.dto';
import { UpdateCertificateDto } from './dto/update-certificate.dto';
import { CertificatesService } from './certificates.service';

@Controller('certificates')
export class CertificatesController {
  constructor(private readonly certificatesService: CertificatesService) {}

  @Public()
  @Get()
  findAll(): any {
    return this.certificatesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  @Post()
  create(@Body() dto: CreateCertificateDto): any {
    return this.certificatesService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCertificateDto): any {
    return this.certificatesService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: string): any {
    return this.certificatesService.remove(id);
  }
}
