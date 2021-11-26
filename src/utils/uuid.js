import { UuidError } from '../errors/uuid-error.js';

// RFC defines 5 groups of 8-4-4-4-12 codepoints chars each
const RFC4122Len = [8, 4, 4, 4, 12];

/**
 * @param { string } char
 * @return { boolean }
 */
const charIsHEX = (char) => !Number.isNaN(parseInt(char, 16));

/**
 * @param { string } str
 * @return { boolean }
 */
const allCharsIsHEX = (str) => [...str].every(charIsHEX);

/**
 * @param { string } id
 * @return { void }
 * @throws { UuidError }
 */
export const validateUUID = (id) => {
  if (id.length !== 36) throw new UuidError(id);

  const groups = id.split('-');
  if (groups.length !== 5) throw new UuidError(id);

  const lenMatch = groups.every((str, i) => str.length === RFC4122Len[i]);
  if (!lenMatch) throw new UuidError(id);

  const isSomeCharNotHEX = groups.map(allCharsIsHEX).some((x) => x === false);
  if (isSomeCharNotHEX) throw new UuidError(id);
};
