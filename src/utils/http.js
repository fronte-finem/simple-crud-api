import { URL } from 'url';
import { HttpError } from '../errors/http-error.js';
import { Header, MimeType } from '../constants/http.js';
import { JsonParseError } from '../errors/json-parse-error.js';
import { ContentTypeError } from '../errors/content-type-error.js';
import { UnknownError } from '../errors/unknown-error.js';

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
export function sendJson(response, data, statusCode = 200) {
  response.setHeader(Header.CONTENT_TYPE, MimeType.JSON);
  response.statusCode = statusCode;
  response.write(JSON.stringify(data));
  response.end();
}

/**
 * @param { AppResponse } response
 * @param { * } error
 */
export function sendError(response, error) {
  const { message, code } =
    error instanceof HttpError ? error : new UnknownError(error);
  sendJson(response, { message, code }, code);
}

/**
 * @param { string } mimeType
 * @param { AppRequest } request
 * @return { Promise<Buffer> }
 * @throws { ContentTypeError }
 */
export const getPayloadBuffer = async (mimeType, request) => {
  const mimeTypeFromRequest = request.headers[Header.CONTENT_TYPE];
  if (mimeTypeFromRequest !== mimeType) {
    throw new ContentTypeError(mimeType, mimeTypeFromRequest);
  }
  const chunks = [];

  for await (const chunk of request) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
};

/**
 * @template T
 * @param { AppRequest } request
 * @return { Promise<T> }
 * @throws { JsonParseError }
 */
export const getJsonPayload = async (request) => {
  const buffer = await getPayloadBuffer(MimeType.JSON, request);
  const json = buffer.toString();
  try {
    return JSON.parse(json);
  } catch (error) {
    throw new JsonParseError((error && error.message) || json);
  }
};
