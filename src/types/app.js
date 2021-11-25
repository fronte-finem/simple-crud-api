/**
 * @typedef { module:http.IncomingMessage } AppRequest
 * @typedef { module:http.ServerResponse } AppResponse
 */

/**
 * @callback Controller
 * @param { string[] } path
 * @param { AppRequest } request
 * @param { AppResponse } response
 * @return { Promise<void> }
 */

/**
 * @callback Middleware
 * @param { AppRequest } request
 * @param { AppResponse } response
 * @param { Middleware } [next]
 * @return { void }
 */
