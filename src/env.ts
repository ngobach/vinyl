export const DEV = process.env.NODE_ENV === "development";
export const REVISION = process.env.APP_REVISION ?? "development";
// export const MEDIA_SOURCE = 'https://cloudflare-ipfs.com/ipns/vinyl.ngobach.com/';
export const MEDIA_SOURCE = "https://files.bachnx.cloud/Vinyl3/";
export const LOG_ENABLED = true;
export const LOADER_SKIPPED = DEV;
export const DEFAULT_THUMBNAIL = "https://i.imgur.com/zqPPJBI.jpg";
