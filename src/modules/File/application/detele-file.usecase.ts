import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { createR2Client } from '../infrastructure/r2.client';

@Injectable()
export class DeleteFileUseCase {
  private readonly bucket: string;
  private readonly s3Client: S3Client;
  constructor(readonly config: ConfigService) {
    this.s3Client = createR2Client(config);
    this.bucket = config.getOrThrow<string>('R2_BUCKET_NAME');
  }
  async execute(key: string): Promise<boolean> {
    try {
      await this.s3Client.send(
        new DeleteObjectCommand({
          Bucket: this.bucket,
          Key: key,
        }),
      );
      return true;
    } catch (error) {
      console.error('Delete R2 file failed', error);
      return false;
    }
  }
}
