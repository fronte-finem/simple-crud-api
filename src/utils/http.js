import { URL } from 'url';
import { getHttpError } from '../errors/http-error.js';
import { Header, MimeType } from '../constants/http.js';

/**
 * @param { AppRequest } request
 * @return { module:url.URL }
 */
export const getUrl = (request) =>
  new URL(request.url, `http://${request.headers.host}`);

/**
 * @template T
 * @param { AppResponse } response
 * @param { T } data
 * @param { number } [statusCode]
 */
export function sendJson(response, data, statusCode) {
  response.setHeader(Header.CONTENT_TYPE, MimeType.JSON);
  response.statusCode = statusCode || 200;
  response.write(JSON.stringify(data));
  response.end();
}

/**
 * @param { AppResponse } response
 * @param { * } error
 */
export function sendError(response, error) {
  const { message, code } = getHttpError(error);
  sendJson(response, { message, code }, code);
}

/**
 * @param { string } mimeType
 * @return { function(AppRequest): Promise<Buffer|null> }
 */
export const getPayloadGetter = (mimeType) => async (request) => {
  if (request.headers[Header.CONTENT_TYPE] !== mimeType) {
    return null;
  }
  const chunks = [];

  for await (const chunk of request) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
};

/**
 * @type { function(AppRequest): Promise<Buffer|null> }
 */
export const getJsonPayload = getPayloadGetter(MimeType.JSON);
