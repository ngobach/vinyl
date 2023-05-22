import { DEFAULT_THUMBNAIL } from "~/env"

export const getThumnailUrl = (src: string): string => {
  if (!src) {
    return DEFAULT_THUMBNAIL;
  }
}
