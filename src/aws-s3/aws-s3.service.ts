import { Injectable, BadRequestException } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import { Rembg } from 'rembg-node';
import sharp from 'sharp';
import 'dotenv/config';
import { IOptionsUpload } from 'src/lib/interfaces';

const { AWS_BUCKET_NAME2, AWS_ACCESS_KEY_ID2, AWS_SECRET_ACCESS_KEY2 } =
  process.env;

@Injectable()
export class AwsS3Service {
  private readonly AWS_S3_BUCKET: string = AWS_BUCKET_NAME2;
  private readonly s3: AWS.S3;

  constructor() {
    this.s3 = new AWS.S3({
      accessKeyId: AWS_ACCESS_KEY_ID2,
      secretAccessKey: AWS_SECRET_ACCESS_KEY2,
    });
  }

  async removeBackground(
    buffer: Buffer,
    options: IOptionsUpload,
  ): Promise<Buffer> {
    const { deleteBG = false, trim = false } = options;
    console.log('remove BG');
    try {
      const input = sharp(buffer);
      const rembg = new Rembg();
      const output = deleteBG ? await rembg.remove(input) : input;
      const webpBuffer = trim
        ? await output.trim().webp().toBuffer()
        : await output.webp().toBuffer();
      return webpBuffer;
    } catch (error) {
      throw new Error(`Error removing background: ${error.message}`);
    }
  }

  async uploadFiles(
    files: Express.Multer.File[],
    options: IOptionsUpload,
  ): Promise<AWS.S3.ManagedUpload.SendData[]> {
    const uploadPromises = files.map(async file => {
      const { buffer, mimetype } = file;
      try {
        if (options?.deleteBG === true || options?.trim === true) {
          const webpBuffer = await this.removeBackground(buffer, options);
          return await this.s3_upload(
            webpBuffer,
            `${this.AWS_S3_BUCKET}/products`,
            `${uuidv4()}.webp`,
            'image/webp',
          );
        } else {
          return await this.s3_upload(
            buffer,
            `${this.AWS_S3_BUCKET}/products`,
            `${uuidv4()}`,
            mimetype,
          );
        }
      } catch (error) {
        throw new Error(`Error uploading file: ${error.message}`);
      }
    });
    return await Promise.all(uploadPromises);
  }

  async uploadReviewFiles(
    files: Express.Multer.File[],
  ): Promise<AWS.S3.ManagedUpload.SendData[]> {
    const uploadPromises = files.map(async file => {
      const { buffer, mimetype } = file;
      try {
        return await this.s3_upload(
          buffer,
          `${this.AWS_S3_BUCKET}/reviews`,
          `${uuidv4()}`,
          mimetype,
        );
      } catch (error) {
        throw new Error(`Error uploading file: ${error.message}`);
      }
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

  extractKeysFromUrls(urls: string[]): string[] {
    return urls.map(url => {
      const segments = url.split('/');
      return segments[segments.length - 1];
    });
  }

  async deleteImages(keys: string[], bucket: string): Promise<void> {
    const keysToDelete = this.extractKeysFromUrls(keys);
    const deletePromises = keysToDelete.map(async key => {
      try {
        const params = {
          Bucket: `${this.AWS_S3_BUCKET}/${bucket}`,
          Key: key,
        };

        await this.s3.deleteObject(params).promise();
      } catch (e) {
        throw new BadRequestException(`Could not delete file: ${e.message}`);
      }
    });
    await Promise.all(deletePromises);
  }
}
