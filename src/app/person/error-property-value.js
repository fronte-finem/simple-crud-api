import { HttpErrorBadRequest } from '../../errors/http-error-bad-request.js';

export class PersonPropertyValueError extends HttpErrorBadRequest {
  /**
   * @template T
   * @param { string } name
   * @param { string } [message]
   */
  constructor(name, message) {
    const explain = message ? `: ${message}` : '';
    super(`Person property [${name}] value invalid${explain}`);
  }
}
