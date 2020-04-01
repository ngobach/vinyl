export const DEV = process.env.NODE_ENV === 'development';
// export const MEDIA_SOURCE: string = 'https://minio.ngobach.com/musik/';
export const MEDIA_SOURCE: string = 'http://localhost:5000/';
export const LOG_ENABLED: boolean = true;
export const LOADER_SKIPPED: boolean = DEV;