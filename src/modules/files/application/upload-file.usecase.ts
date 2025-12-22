import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import { Upload } from '@aws-sdk/lib-storage';
import { createR2Client } from '../infrastructure/r2.client';
import sharp from 'sharp';
import { S3Client } from '@aws-sdk/client-s3';
import { lookup } from 'mime-types';

@Injectable()
export class UploadFileUseCase {
  private readonly bucket: string;
  private readonly s3Client: S3Client;

  constructor(private readonly config: ConfigService) {
    this.s3Client = createR2Client(config);
    this.bucket = config.getOrThrow<string>('R2_BUCKET_NAME');
  }

  /**
   * Upload buffer to R2 (Cloudflare R2 / S3 compatible)
   * @param key Path + filename
   * @param buffer File buffer
   * @param originalName Original filename (used for MIME type detection)
   */
  private async uploadToR2(key: string, buffer: Buffer, originalName: string) {
    const contentType = lookup(originalName) || 'application/octet-stream';

    const upload = new Upload({
      client: this.s3Client,
      params: {
        Bucket: this.bucket,
        Key: key,
        Body: buffer,
        ContentType: contentType,
      },
    });

    await upload.done();
    return `${this.config.getOrThrow<string>('R2_PUBLIC')}/${key}`;
  }

  /**
   * Main execute function to handle multiple files
   */
  async execute(files: Express.Multer.File[]) {
    const results: { url: string; key: string }[] = [];
    const mediumSize = { width: 720 };

    for (const file of files) {
      const baseName = file.originalname.replace(/\.[^/.]+$/, '');
      const timestamp = Date.now();
      const ext = file.originalname.split('.').pop()?.toLowerCase() || '';
      let buffer: Buffer;
      let key: string;

      // Check if file is an image type supported by Sharp
      if (['jpg', 'jpeg', 'png', 'webp', 'tiff', 'gif', 'avif'].includes(ext)) {
        // Resize and convert to webp
        buffer = await sharp(file.path)
          .resize(mediumSize.width, null, { fit: 'inside', withoutEnlargement: true })
          .webp({ quality: 85 })
          .toBuffer();

        key = `${this.config.getOrThrow<string>('R2_FOLDER')}/images/medium/${timestamp}-${baseName}.webp`;
      } else {
        // For PDF or other files, just read buffer directly
        buffer = fs.readFileSync(file.path);
        key = `${this.config.getOrThrow<string>('R2_FOLDER')}/files/${timestamp}-${file.originalname}`;
      }

      // Upload to R2
      const url = await this.uploadToR2(key, buffer, file.originalname);

      // Delete local temp file
      fs.unlinkSync(file.path);

      results.push({ url, key });
    }

    return results;
  }
}
