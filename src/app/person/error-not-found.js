import { HttpError } from '../../errors/http-error.js';

export class PersonNotFoundError extends HttpError {
  /**
   * @param { string } id
   */
  constructor(id) {
    super(404);
    this.message = `Person with ID '${id}' not found!`;
  }
}
