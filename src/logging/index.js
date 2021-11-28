import { Console } from 'console';
import { Control } from './constants.js';
import { stringify } from '../utils/stringify.js';
import { parseHexColor } from './parse-color.js';

/**
 * @type { Console }
 */
const logger = new Console({ stdin: process.stdin, stdout: process.stdout });

const getEscCode = (...codes) => `\x1b[${codes.join(';')}m`;

const resetCode = getEscCode(Control.RESET);

/**
 * @param { number } ground
 * @return { (color?: string) => string }
 */
const getColorCodeFormatter = (ground) => (color) =>
  color ? `\x1b[${ground};2;${parseHexColor(color).join(';')}m` : '';

const getFgCode = getColorCodeFormatter(38);
const getBgCode = getColorCodeFormatter(48);

/**
 * @param { ConsoleColor | undefined } color
 * @return { string }
 */
const getColorCode = ({ fg, bg } = {}) => `${getFgCode(fg)}${getBgCode(bg)}`;

/**
 * @param { string } message
 * @param { ConsoleColor } [color]
 */
export const colorize = (message, color) => {
  const colorCode = getColorCode(color);
  return `${colorCode}${message}${resetCode}`;
};

const getTime = () => new Date().toISOString();
const getPrettyTime = () => colorize(`[${getTime()}]`, { fg: '#08F' });

/**
 * @param { string } message
 * @param { ConsoleColor } [color]
 */
export const logg = (message, color) => {
  const time = getPrettyTime();
  if (!color) {
    return logger.log(`${time} ${message}`);
  }
  const colorizedMessage = colorize(message, color);
  return logger.log(`${time} ${colorizedMessage}`);
};

/**
 * @param { * } error
 * @param { AppRequest } [req]
 */
export const loggError = (error, req) => {
  const msg =
    error instanceof Error
      ? `${error.message} ${stringify(error)}`
      : stringify(error);
  const url = `http://${req.headers.host}${req.url}`;
  logg(`Error: ${msg}${req ? ` ${url}` : ''}`, { fg: '#F33' });
};
