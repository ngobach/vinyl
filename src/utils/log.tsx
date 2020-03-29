import { LOG_ENABLED } from '~/env';

function log (...args: any[]) {
  if (LOG_ENABLED) {
    // tslint:disable-next-line
    console.log(...args);
  }
}

export default log;
