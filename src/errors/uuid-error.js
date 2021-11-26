import { HttpErrorBadRequest } from './http-error-bad-request.js';

export class UuidError extends HttpErrorBadRequest {
  /**
   * @param { string } id
   */
  constructor(id) {
    super(`'${id}' not a valid UUID!`);
  }
}
