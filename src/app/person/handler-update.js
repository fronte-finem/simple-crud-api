import { getJsonPayload, sendJson } from '../../utils/http.js';
import { PathError } from '../../errors/path-error.js';
import { personDatabase } from './database.js';
import { validatePerson } from './validate.js';
import { validateUUID } from '../../utils/uuid.js';
import { PersonNotFoundError } from './error-not-found.js';

/**
 * @type { Controller }
 */
export const handlerUpdate = async (path, request, response) => {
  if (path.length !== 1) {
    throw new PathError(request);
  }
  const [id] = path;
  validateUUID(id);

  const inputPerson = await getJsonPayload(request);
  validatePerson(inputPerson);

  const maybePerson = await personDatabase.update(id, inputPerson);
  if (!maybePerson) throw new PersonNotFoundError(id);

  sendJson(response, maybePerson, 200);
};
