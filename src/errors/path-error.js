import { HttpErrorBadRequest } from './http-error-bad-request.js';

export class PathError extends HttpErrorBadRequest {
  /**
   * @param { AppRequest } request
   */
  constructor(request) {
    super(`Path not valid "${request.url}"`);
  }
}
