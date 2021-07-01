export const DEV = process.env.NODE_ENV === 'development';
export const REVISION = process.env.APP_REVISION ?? 'development';
export const MEDIA_SOURCE = 'https://minio.matmang.xyz/vinyl';
export const LOG_ENABLED = true;
export const LOADER_SKIPPED = DEV;
export const DEFAULT_THUMBNAIL = 'https://minio.matmang.xyz/static/default-cover.png';
