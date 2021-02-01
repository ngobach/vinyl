import { LOG_ENABLED } from '~/env';

function log(...args: unknown[]): void {
  if (LOG_ENABLED) {
    console.log(...args);
  }
}

export default log;
