import { colorize } from '../../src/logging/index.js';

export const getRandomId = () => Math.random().toString(16).slice(2);

export const describe1 = (name, func) =>
  describe(colorize(name, { fg: '#F80', bg: '#000' }), func);

export const describe2 = (name, func) =>
  describe(colorize(name, { fg: '#08F' }), func);

export const describe3 = (name, func) =>
  describe(colorize(name, { fg: '#048' }), func);
