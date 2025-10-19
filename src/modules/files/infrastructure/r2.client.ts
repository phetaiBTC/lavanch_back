// src/file/infrastructure/r2.client.ts
import { S3Client } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';

export const createR2Client = (config: ConfigService) => {
  return new S3Client({
    endpoint: config.getOrThrow<string>('R2_ENDPOINT'),
    region: 'auto',
    credentials: {
      accessKeyId: config.getOrThrow<string>('R2_ACCESS_KEY_ID'),
      secretAccessKey: config.getOrThrow<string>('R2_SECRET_ACCESS_KEY'),
    },
  });
};
