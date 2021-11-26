import { HttpErrorBadRequest } from '../../errors/http-error-bad-request.js';

export class PersonPropertyError extends HttpErrorBadRequest {
  /**
   * @template T
   * @param { string } name
   * @param { string } [message]
   */
  constructor(name, message) {
    const explain = message ? `: ${message}` : '';
    super(`Person property [${name}] invalid${explain}`);
  }
}
