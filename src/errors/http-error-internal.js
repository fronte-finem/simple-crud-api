import { HttpError } from './http-error.js';

export class HttpErrorInternal extends HttpError {
  /**
   * @param { string } message
   */
  constructor(message) {
    super(500, message);
  }
}
