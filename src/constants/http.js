/**
 * ### {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods}
 */
export const Method = Object.freeze({
  GET: 'GET',
  HEAD: 'HEAD',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
  CONNECT: 'CONNECT',
  OPTIONS: 'OPTIONS',
  TRACE: 'TRACE',
});

/**
 * ### {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers}
 */
export const Header = Object.freeze({
  CONTENT_TYPE: 'Content-Type',
  CONTENT_LENGTH: 'Content-Length',
  CONTENT_ENCODING: 'Content-Encoding',
  CONTENT_LOCATION: 'Content-Location',
  LOCATION: 'Location',
  USER_AGENT: 'User-Agent',
  REFERER: 'Referer',
  ALLOW: 'Allow',
  SERVER: 'Server',
});

/**
 * ### {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type}
 * ### {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types}
 */
export const MimeType = Object.freeze({
  JSON: 'application/json',
  TEXT: 'text/plain',
  HTML: 'text/html',
  CSS: 'text/css',
  JS: 'text/javascript',
  JPG: 'image/jpeg',
  PNG: 'image/png',
  GIF: 'image/gif',
  SVG: 'image/svg+xml',
  FORM_DATA: 'multipart/form-data',
});
