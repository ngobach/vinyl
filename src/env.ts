import defaultThumbnail from './assets/img/thumbnail.jpg';
export const DEV = !import.meta.env.PROD;
export const REVISION = import.meta.env.PROD ? 'prod' : 'development';
export const MEDIA_SOURCE = 'https://minio.hub.zsvr.cloud/vinyl/vinyl';
// export const MEDIA_SOURCE = '/_data';
export const LOG_ENABLED = true;
export const LOADER_SKIPPED = DEV;
export const DEFAULT_THUMBNAIL = defaultThumbnail;
