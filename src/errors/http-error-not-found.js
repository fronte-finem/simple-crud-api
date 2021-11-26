import { HttpError } from './http-error.js';

export class HttpErrorNotFound extends HttpError {
  /**
   * @param { string } url
   */
  constructor(url) {
    super(404, url);
  }
}
