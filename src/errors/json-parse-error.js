import { HttpErrorBadRequest } from './http-error-bad-request.js';

export class JsonParseError extends HttpErrorBadRequest {
  /**
   * @param { string } message
   */
  constructor(message) {
    super(`Can't parse json in payload! \n${message}`);
  }
}
