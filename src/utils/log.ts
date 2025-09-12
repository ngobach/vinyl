import { LOG_ENABLED } from '@/env';

export const log: typeof console.log = (...args: unknown[]) => {
  if (LOG_ENABLED) {
    console.log(...args);
  }
};
