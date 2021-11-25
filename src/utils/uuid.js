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
 * @param { string } uuid
 * @return { boolean }
 */
export const isUuidValid = (uuid) => {
  if (uuid.length !== 36) return false;

  const groups = uuid.split('-');
  if (groups.length !== 5) return false;

  const lenMatch = groups.every((str, i) => str.length === RFC4122Len[i]);
  if (!lenMatch) return false;

  return groups.map(allCharsIsHEX).every((x) => x === true);
};
