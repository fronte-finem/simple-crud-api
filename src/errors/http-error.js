import http from 'http';

const DEFAULT_CODE = 500;
const DEFAULT_MESSAGE = http.STATUS_CODES[DEFAULT_CODE];

/**
 * @param { number } code
 * @return { string }
 */
const unknownCodeMessage = (code) =>
  `${DEFAULT_MESSAGE} [unknown code ${code}]`;

/**
 * @param { string } statusMessage
 * @param { string } message
 * @return { string }
 */
const composeMessage = (statusMessage, message) =>
  `${statusMessage}${message ? ` — ${message}` : ''}`;

export class HttpError extends Error {
  /**
   * @description Pass code from {@link module:http.STATUS_CODES}
   * @requires module:http.STATUS_CODES
   * @param { number } code
   * @param { string } [message]
   */
  constructor(code, message) {
    const maybeStatusMessage = http.STATUS_CODES[code];
    const safeCode = maybeStatusMessage ? code : DEFAULT_CODE;
    const safeStatusMessage = maybeStatusMessage || unknownCodeMessage(code);
    const safeMessage = composeMessage(safeStatusMessage, message);
    super(safeMessage);
    this.code = safeCode;
  }
}
