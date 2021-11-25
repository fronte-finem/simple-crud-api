import { personController } from './person/controller.js';
import { HttpError } from '../errors/http-error.js';
import { getUrl } from '../utils/http.js';

/**
 * @type { Map<string, Controller> }
 */
export const RouteMap = new Map();
RouteMap.set('person', personController);

/**
 * @param { AppRequest } request
 * @param { AppResponse } response
 * @return {Promise<void>}
 */
export function router(request, response) {
  const [, route, ...path] = getUrl(request).pathname.split('/');
  if (!RouteMap.has(route)) {
    throw new HttpError(404);
  }
  return RouteMap.get(route)(path, request, response);
}
