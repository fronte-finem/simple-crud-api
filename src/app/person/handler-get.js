import { sendJson } from '../../utils/http.js';
import { personDatabase } from './database.js';
import { logg } from '../../logging/index.js';
import { HttpError } from '../../errors/http-error.js';
import { isUuidValid } from '../../utils/uuid.js';

/**
 * @type { Controller }
 */
export const handlerGet = async (path, request, response) => {
  if (path.length === 0) {
    return sendJson(response, personDatabase.read());
  }
  if (path.length === 1 && isUuidValid(path[0])) {
    return logg(path[0]);
  }
  throw new HttpError(404);
};
