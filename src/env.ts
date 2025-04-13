import defaultThumbnail from "./assets/img/thumbnail.jpg";
export const DEV = process.env.NODE_ENV === "development";
export const REVISION = process.env.APP_REVISION ?? "development";
export const MEDIA_SOURCE = DEV
  ? "http://localhost:3000/"
  : new URL("/_data/", window.location.href).toString();
export const LOG_ENABLED = true;
export const LOADER_SKIPPED = DEV;
export const DEFAULT_THUMBNAIL = defaultThumbnail;
