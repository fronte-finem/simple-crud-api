import { stringify } from '../utils/stringify.js';
import { HttpErrorInternal } from './http-error-internal.js';

export class UnknownError extends HttpErrorInternal {
  /**
   * @param { * } data
   */
  constructor(data) {
    super(data.message === 'string' ? data.message : stringify(data));
  }
}
