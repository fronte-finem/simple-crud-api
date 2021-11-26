import { PersonNotObjectError } from './error-not-object.js';
import { PersonPropertyError } from './error-property.js';

/**
 * @template T
 * @typedef { Object } ValidatorOptions
 * @property { string } name - Property name
 * @property { string } explain - Explain why property value invalid
 * @property { (value: T) => boolean } validate - Property validator
 */

/**
 * @template T
 * @param { ValidatorOptions } options
 * @return { (value: T) => void }
 */
const getPropertyValidator =
  ({ name, explain, validate }) =>
  (value) => {
    if (!validate(value)) {
      throw new PersonPropertyError(name, explain);
    }
  };

export const PERSON_SCHEME = {
  name: getPropertyValidator({
    name: 'name',
    explain: 'expected not empty string',
    validate: (value) => typeof value === 'string' && value.length > 0,
  }),
  age: getPropertyValidator({
    name: 'age',
    explain: 'expected positive number',
    validate: (value) => typeof value === 'number' && value >= 0,
  }),
  hobbies: getPropertyValidator({
    name: 'hobbies',
    explain: 'expected array of strings or empty array',
    validate: (value) =>
      Array.isArray(value) && value.every((item) => typeof item === 'string'),
  }),
};

/**
 * @param { * } maybePerson
 */
export const validatePerson = (maybePerson) => {
  const type = typeof maybePerson;
  if (type !== 'object') throw new PersonNotObjectError(type);
  // if (maybePerson === null) throw new PersonNotObjectError('null');
  if (Array.isArray(maybePerson)) throw new PersonNotObjectError('Array');
  Object.entries(PERSON_SCHEME).forEach(([prop, validate]) =>
    validate(maybePerson[prop])
  );
};
