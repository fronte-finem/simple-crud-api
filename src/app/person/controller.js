import { Method } from '../../constants/http.js';
import { handlerGet } from './handler-get.js';
import { HttpError } from '../../errors/http-error.js';

/**
 * @type { Controller }
 */
export const personController = async (path, request, response) => {
  switch (request.method) {
    case Method.GET:
      return handlerGet(path, request, response);
    case Method.POST:
      return handlerGet(path, request, response);
    case Method.PUT:
      return handlerGet(path, request, response);
    case Method.DELETE:
      return handlerGet(path, request, response);
    default:
  }
  throw new HttpError(500);
};
