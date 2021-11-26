import { Method } from '../../constants/http.js';
import { handleRead } from './handlers/read.js';
import { handleCreate } from './handlers/create.js';
import { handleUpdate } from './handlers/update.js';
import { handleDelete } from './handlers/delete.js';
import { HttpErrorMethodNotAllowed } from '../../errors/http-error-method-not-allowed.js';

/**
 * @type { Controller }
 */
export const personController = async (path, request, response) => {
  switch (request.method) {
    case Method.GET:
      return handleRead(path, request, response);
    case Method.POST:
      return handleCreate(path, request, response);
    case Method.PUT:
      return handleUpdate(path, request, response);
    case Method.DELETE:
      return handleDelete(path, request, response);
    default:
      throw new HttpErrorMethodNotAllowed(request.method);
  }
};
