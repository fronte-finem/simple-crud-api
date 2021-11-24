import http from 'http';
import { stringify } from '../utils/stringify.js';

export class HttpError extends Error {
  constructor(code) {
    super(http.STATUS_CODES[code]);
    this.code = code;
  }
}

/**
 * @param { * } unknownError
 * @return  { HttpError }
 */
export function getHttpError(unknownError) {
  if (unknownError instanceof HttpError) {
    return unknownError;
  }
  if (typeof unknownError.message === 'string') {
    return new HttpError(500, unknownError.message);
  }
  return new HttpError(500, stringify(unknownError));
}
