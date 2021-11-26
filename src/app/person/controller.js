import { Method } from '../../constants/http.js';
import { handlerRead } from './handler-read.js';
import { handlerCreate } from './handler-create.js';
import { handlerUpdate } from './handler-update.js';
import { handlerDelete } from './handler-delete.js';
import { HttpErrorMethodNotAllowed } from '../../errors/http-error-method-not-allowed.js';

/**
 * @type { Controller }
 */
export const personController = async (path, request, response) => {
  switch (request.method) {
    case Method.GET:
      return handlerRead(path, request, response);
    case Method.POST:
      return handlerCreate(path, request, response);
    case Method.PUT:
      return handlerUpdate(path, request, response);
    case Method.DELETE:
      return handlerDelete(path, request, response);
    default:
      throw new HttpErrorMethodNotAllowed(request.method);
  }
};
