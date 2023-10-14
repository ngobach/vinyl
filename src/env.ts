import defaultThumbnail from './assets/img/thumbnail.jpg';
export const DEV = process.env.NODE_ENV === "development";
export const REVISION = process.env.APP_REVISION ?? "development";
// export const MEDIA_SOURCE = "https://minio.hub.zsvr.cloud/vinyl/vinyl";
export const MEDIA_SOURCE = "/_data";
export const LOG_ENABLED = true;
export const LOADER_SKIPPED = DEV;
export const DEFAULT_THUMBNAIL = defaultThumbnail;
