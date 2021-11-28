import { randomInt } from 'crypto';

const foo = {};
foo.bar = 123.45;
foo.baz = null;
foo.qux = Object.freeze([1, 2, 3]);
foo.self = foo;

/**
 * @type { Controller }
 */
export const randomErrorController = async () => {
  switch (randomInt(1, 6)) {
    case 1:
      foo.bar();
      break;
    case 2:
      foo.bar.toFixed(1001);
      break;
    case 3:
      foo.baz.toString();
      break;
    case 4:
      foo.qux.push(4);
      break;
    case 5:
      JSON.stringify(foo);
      break;
    default:
      throw Error('Unreachable default case');
  }
};
