import { setTimeout } from 'timers/promises';
import { randomInt } from 'crypto';

/**
 * @param { { min?: number, max?: number } } [options]
 * @return { Promise<void> }
 */
export const randomDelay = ({ min = 10, max = 50 } = {}) =>
  setTimeout(randomInt(min, max));
