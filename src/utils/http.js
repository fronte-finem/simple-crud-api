import { URL } from 'url';

/**
 * @param { AppRequest } req
 * @return { module:url.URL }
 */
export const getUrl = (req) => new URL(req.url, `http://${req.headers.host}`);
