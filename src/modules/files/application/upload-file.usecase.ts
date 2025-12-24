import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import { Upload } from '@aws-sdk/lib-storage';
import { createR2Client } from '../infrastructure/r2.client';
import sharp from 'sharp';
import { S3Client } from '@aws-sdk/client-s3';

@Injectable()
export class UploadFileUseCase {
  private readonly bucket: string;
  private readonly s3Client: S3Client;
  constructor(private readonly config: ConfigService) {
    this.s3Client = createR2Client(config);
    this.bucket = config.getOrThrow<string>('R2_BUCKET_NAME');
  }
  private async uploadToR2(key: string, buffer: Buffer) {
    const upload = new Upload({
      client: this.s3Client,
      params: {
        Bucket: this.bucket,
        Key: key,
        Body: buffer,
        ContentType: 'image/webp',
      },
    });
    await upload.done();
    return `${this.config.getOrThrow<string>('R2_ENDPOINT')}/${this.bucket}/${key}`;
  }
  async execute(files: Express.Multer.File[]) {
    const results: { url: string; key: string }[] = [];
    const mediumSize = { width: 720 }; // แค่ medium
    for (const file of files) {
      try {
        const baseName = file.originalname.replace(/\.[^/.]+$/, '');
        const timestamp = Date.now();

        const buffer = await sharp(file.path)
          .resize(mediumSize.width, null, {
            fit: 'inside',
            withoutEnlargement: true,
          })
          .webp({ quality: 85 })
          .toBuffer();

        const key = `set_up/images/medium/${timestamp}-${baseName}.webp`;
        const url = await this.uploadToR2(key, buffer);

        fs.unlinkSync(file.path);
        results.push({ url, key });
      } catch (error) {
        // Clean up file if processing fails
        if (fs.existsSync(file.path)) {
          fs.unlinkSync(file.path);
        }
        
        throw new BadRequestException({
          message: 'Failed to process image',
          error: 'IMAGE_PROCESSING_ERROR',
          details: {
            fileName: file.originalname,
            reason: error.message || 'Unable to process image file. Please ensure the file is a valid JPEG or PNG image.',
          },
        });
      }
    }

    return results;
  }
}
