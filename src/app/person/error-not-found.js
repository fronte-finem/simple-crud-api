import { HttpError } from '../../errors/http-error.js';

export class PersonNotFound extends HttpError {
  /**
   * @param { string } id
   */
  constructor(id) {
    super(404);
    this.message = `Person with "${id}" not found!`;
  }
}
