import { sendJson } from '../../utils/http.js';
import { personDatabase } from './database.js';
import { validateUUID } from '../../utils/uuid.js';
import { PersonNotFoundError } from './error-not-found.js';
import { PathError } from '../../errors/path-error.js';

/**
 * @type { Controller }
 */
export const handlerRead = async (path, request, response) => {
  if (path.length === 0) {
    const persons = await personDatabase.read();
    return sendJson(response, persons);
  }
  if (path.length !== 1) {
    throw new PathError(request);
  }
  const [id] = path;
  validateUUID(id);

  const maybePerson = await personDatabase.findByID(id);
  if (!maybePerson) throw new PersonNotFoundError(id);

  return sendJson(response, maybePerson);
};
