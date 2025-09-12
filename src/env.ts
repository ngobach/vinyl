import defaultThumbnail from '@/assets/img/thumbnail.jpg';
export const DEV = !import.meta.env.PROD;
export const REVISION = import.meta.env.PROD ? 'prod' : 'dev';
export const MEDIA_SOURCE = import.meta.env.VITE_MEDIA_SOURCE_BASEURL;
export const LOG_ENABLED = true;
export const DEFAULT_THUMBNAIL = defaultThumbnail;
