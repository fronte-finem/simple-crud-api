import { getJsonPayload, sendJson } from '../../utils/http.js';
import { PathError } from '../../errors/path-error.js';
import { personDatabase } from './database.js';

const validatePerson = () => {};

/**
 * @type { Controller }
 */
export const handlerCreate = async (path, request, response) => {
  if (path.length !== 0) {
    throw new PathError(request);
  }
  /** @type { Person } */

  const inputPerson = await getJsonPayload(request);
  validatePerson(inputPerson);

  const person = await personDatabase.create(inputPerson);
  sendJson(response, person, 201);
};
