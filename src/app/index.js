import { router } from './router.js';
import { sendError } from '../utils/send-error.js';
import { loggError } from '../logging/index.js';

/**
 * @param { AppRequest } req
 * @param { AppResponse } res
 */
export function app(req, res) {
  try {
    router(req, res);
  } catch (error) {
    loggError(error, req);
    sendError(res, error);
  }
}
