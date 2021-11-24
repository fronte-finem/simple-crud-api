import { getHttpError } from '../errors/http-error.js';

/**
 * @param { AppResponse } res
 * @param { * } error
 */
export function sendError(res, error) {
  const { message, code } = getHttpError(error);
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = code;
  res.end(JSON.stringify({ message, code }));
}
