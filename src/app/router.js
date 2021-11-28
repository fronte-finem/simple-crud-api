import { personController } from './person/controller.js';
import { getUrl } from '../utils/http.js';
import { HttpErrorNotFound } from '../errors/http-error-not-found.js';

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
  const [, route, ...path] = request.url.split('/');
  if (!RouteMap.has(route)) {
    throw new HttpErrorNotFound(request.url);
  }
  return RouteMap.get(route)(path, request, response);
}
