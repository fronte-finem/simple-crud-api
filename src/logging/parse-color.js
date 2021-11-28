function getHexColorRegex(is6 = false) {
  const num = is6 ? '[0-9A-F]{2}' : '[0-9A-F]';
  return new RegExp(`#(?<r>${num})(?<g>${num})(?<b>${num})`, 'i');
}

const HEX_COLOR_REGEX_6_CHAR = getHexColorRegex(true);
const HEX_COLOR_REGEX_3_CHAR = getHexColorRegex(false);

/**
 * @param { string } x
 * @return { number }
 * @example
 * 'FF' => 255
 * 'f' => 'FF' => 255
 */
const part2num = (x) => parseInt(x.length > 1 ? x : `${x}${x}`, 16);

/**
 * @param { string } hexColor
 * @return { null | Color }
 * @example
 * '#FE1234' => [254, 18, 52]
 * '#f80' => '#FF8800' => [255, 136, 0]
 */
export function parseHexColor(hexColor) {
  /** @type { RegExpExecArray | null } */
  let result = null;
  switch (hexColor.length) {
    case 4:
      result = HEX_COLOR_REGEX_3_CHAR.exec(hexColor);
      break;
    case 7:
      result = HEX_COLOR_REGEX_6_CHAR.exec(hexColor);
      break;
    default:
      return null;
  }
  if (result === null) return null;
  const { r, g, b } = result.groups;
  return [r, g, b].map(part2num);
}
