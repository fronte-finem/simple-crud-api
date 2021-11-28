import { HttpError } from './http-error.js';

export class HttpErrorBadRequest extends HttpError {
  /**
   * @param { string } message
   */
  constructor(message) {
    super(400, message);
  }
}
