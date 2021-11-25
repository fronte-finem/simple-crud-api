import { router } from './router.js';
import { loggError } from '../logging/index.js';
import { sendError } from '../utils/http.js';

/**
 * @param { AppRequest } req
 * @param { AppResponse } res
 */
export async function app(req, res) {
  try {
    await router(req, res);
  } catch (error) {
    loggError(error, req);
    sendError(res, error);
  }
}
