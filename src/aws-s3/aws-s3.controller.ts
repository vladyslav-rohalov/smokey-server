import { Controller, Post } from '@nestjs/common';
import { AwsS3Service } from './aws-s3.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadedFile } from '@nestjs/common';
import { UseInterceptors } from '@nestjs/common';

@Controller('aws-s3')
export class AwsS3Controller {
  constructor(private readonly awsS3Service: AwsS3Service) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('files'))
  uploadFiles(@UploadedFile() files: Express.Multer.File[]) {
    console.log(files);
    return this.awsS3Service.uploadFiles(files);
  }
}
