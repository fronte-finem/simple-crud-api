import { HttpError } from './http-error.js';

export class MethodNotAllowedError extends HttpError {
  /**
   * @param { string } method
   */
  constructor(method) {
    super(405, method);
  }
}
