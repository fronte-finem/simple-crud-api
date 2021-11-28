import { router } from './router.js';
import { loggError } from '../logging/index.js';
import { sendError } from '../utils/http.js';

/**
 * @param { {doLog:boolean} } [options]
 * @return { (request: AppRequest, response: AppResponse) => Promise<void> }
 */
export const getApp =
  ({ doLog = false }) =>
  async (request, response) => {
    try {
      await router(request, response);
    } catch (error) {
      if (doLog) loggError(error, request);
      sendError(response, error);
    }
  };
