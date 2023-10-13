import { Injectable, BadRequestException } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import 'dotenv/config';

const { AWS_BUCKET_NAME, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } =
  process.env;

@Injectable()
export class AwsS3Service {
  private readonly AWS_S3_BUCKET: string = AWS_BUCKET_NAME;
  private readonly s3: AWS.S3;

  constructor() {
    this.s3 = new AWS.S3({
      accessKeyId: AWS_ACCESS_KEY_ID,
      secretAccessKey: AWS_SECRET_ACCESS_KEY,
    });
  }

  // async uploadFile(
  //   file: Express.Multer.File,
  // ): Promise<AWS.S3.ManagedUpload.SendData> {
  //   const { originalname, buffer, mimetype } = file;

  //   return await this.s3_upload(
  //     buffer,
  //     `${this.AWS_S3_BUCKET}/products`,
  //     `${uuidv4()}-${originalname}`,
  //     mimetype,
  //   );
  // }
  async uploadFiles(
    files: Express.Multer.File[],
  ): Promise<AWS.S3.ManagedUpload.SendData[]> {
    const uploadPromises = files.map(async file => {
      const { originalname, buffer, mimetype } = file;
      return await this.s3_upload(
        buffer,
        `${this.AWS_S3_BUCKET}/products`,
        `${uuidv4()}-${originalname}`,
        mimetype,
      );
    });

    return await Promise.all(uploadPromises);
  }

  private async s3_upload(
    file: Buffer,
    bucket: string,
    name: string,
    mimetype: string,
  ): Promise<AWS.S3.ManagedUpload.SendData> {
    const params = {
      Bucket: bucket,
      Key: name,
      Body: file,
      ACL: 'public-read',
      ContentType: mimetype,
      ContentDisposition: 'inline',
      CreateBucketConfiguration: {
        LocationConstraint: 'eu-central-1',
      },
    };

    try {
      const s3Response = await this.s3.upload(params).promise();
      return s3Response;
    } catch (e) {
      throw new BadRequestException(`Could not upload file: ${e.message}`);
    }
  }
}
