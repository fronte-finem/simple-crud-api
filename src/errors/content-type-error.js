import { HttpErrorBadRequest } from './http-error-bad-request.js';

export class ContentTypeError extends HttpErrorBadRequest {
  /**
   * @param { string } whatWasExpected
   * @param { string } whatIs
   */
  constructor(whatWasExpected, whatIs) {
    super(
      `Content-Type invalid: expected "${whatWasExpected}" but received "${whatIs}"!`
    );
  }
}
