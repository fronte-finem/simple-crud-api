import { sendEmpty } from '../../../utils/http.js';
import { PathError } from '../../../errors/path-error.js';
import { personDatabase } from '../service.js';
import { validateUUID } from '../../../utils/uuid.js';
import { PersonNotFoundError } from '../errors/error-not-found.js';

/**
 * @type { Controller }
 */
export const handleDelete = async (path, request, response) => {
  if (path.length !== 1) {
    throw new PathError(request);
  }
  const [id] = path;
  validateUUID(id);

  const maybePerson = await personDatabase.delete(id);
  if (!maybePerson) throw new PersonNotFoundError(id);

  sendEmpty(response);
};
