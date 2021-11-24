/**
 * @typedef { import('http').IncomingMessage } AppRequest
 * @typedef { import('http').ServerResponse } AppResponse
 */

/**
 * @callback Controller
 * @param { string[] } path
 * @param { Request } req
 * @param { Response } res
 * @return { void }
 */
