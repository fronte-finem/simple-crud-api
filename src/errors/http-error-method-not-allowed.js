import { HttpError } from './http-error.js';

export class HttpErrorMethodNotAllowed extends HttpError {
  /**
   * @param { string } method
   */
  constructor(method) {
    super(405, method);
  }
}
