import { HttpErrorBadRequest } from '../../errors/http-error-bad-request.js';

export class PersonPropertyTypeError extends HttpErrorBadRequest {
  /**
   * @template T
   * @param { string } name
   * @param { string } type
   * @param { T } value
   */
  constructor(name, type, value) {
    super(
      `Person property [${name}] invalid, expected "${type}" but received "${typeof value}"`
    );
  }
}
