import { Console } from 'console';
import { Control } from './constants.js';
import { stringify } from '../utils/stringify.js';
import { getUrl } from '../utils/http.js';
import { parseHexColor } from './parse-color.js';

/**
 * @type { Console }
 */
const logger = new Console({ stdin: process.stdin, stdout: process.stdout });

const getEscCode = (...codes) => `\x1b[${codes.join(';')}m`;

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

const resetCode = getEscCode(Control.RESET);
const timeColor = getColorCode({ fg: '#08F' });

const getTime = () => new Date().toISOString();
const getPrettyTime = () => `${timeColor}[${getTime()}]${resetCode}`;

/**
 * @param { string } message
 * @param { ConsoleColor } [color]
 */
export const logg = (message, color) => {
  const time = getPrettyTime();
  if (!color) {
    return logger.log(`${time} ${message}`);
  }
  const colorCode = getColorCode(color);
  return logger.log(`${time} ${colorCode}${message}${resetCode}`);
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
  logg(`Error: ${msg}${req ? ` ${getUrl(req)}` : ''}`, { fg: '#F33' });
};
