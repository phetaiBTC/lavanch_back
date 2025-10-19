import { ImagesOrm } from 'src/database/typeorm/image.orm-entity';
import { Images } from '../domain/images.entity';
import { ImageResponse } from '../interface/images.interface';
import { formatDate } from 'src/shared/utils/dayjs.util';

export const ImagesMapper = {
  toDomain(schema: ImagesOrm): Images {
    return new Images({
      id: schema.id,
      url: schema.url,
      key: schema.key,
      createdAt: schema.createdAt,
      updatedAt: schema.updatedAt,
      deletedAt: schema.deletedAt,
    });
  },
  toSchema(domain: Images): ImagesOrm {
    const schema = new ImagesOrm();
    if (domain.value.id != null) schema.id = domain.value.id;
    schema.url = domain.value.url;
    schema.key = domain.value.key;
    return schema;
  },
  toResponse(domain: Images): ImageResponse {
    return {
      id: domain.value.id!,
      url: domain.value.url,
      key: domain.value.key,
      createdAt: formatDate(domain.value.createdAt),
      updatedAt: formatDate(domain.value.updatedAt),
      deletedAt: domain.value.deletedAt
        ? formatDate(domain.value.deletedAt)
        : null,
    };
  },
};
