import { Method } from '../../constants/http.js';
import { handlerRead } from './handler-read.js';
import { HttpError } from '../../errors/http-error.js';
import { handlerCreate } from './handler-create.js';

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
      return handlerRead(path, request, response);
    case Method.DELETE:
      return handlerRead(path, request, response);
    default:
  }
  throw new HttpError(500);
};
