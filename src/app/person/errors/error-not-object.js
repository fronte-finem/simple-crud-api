import { HttpErrorBadRequest } from '../../../errors/http-error-bad-request.js';

export class PersonNotObjectError extends HttpErrorBadRequest {
  /**
   * @param { string } type
   */
  constructor(type) {
    super(`Person type invalid, expected 'object' but received '${type}'`);
  }
}
