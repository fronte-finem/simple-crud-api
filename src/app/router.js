import { personController } from './person/controller.js';
import { HttpError } from '../errors/http-error.js';
import { getUrl } from '../utils/http.js';

/**
 * @type { Map<string, Controller> }
 */
export const RouteMap = new Map();
RouteMap.set('person', personController);

/**
 * @param { AppRequest } req
 * @param { AppResponse } res
 */
export function router(req, res) {
  const [, route, ...path] = getUrl(req).pathname.split('/');
  if (!RouteMap.has(route)) {
    throw new HttpError(404);
  }
  RouteMap.get(route)(path, req, res);
}
