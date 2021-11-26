import { PersonNotObjectError } from './error-not-object.js';
import { PersonPropertyValueError } from './error-property-value.js';
import { PersonPropertyTypeError } from './error-property-type.js';

/**
 * @template T
 * @typedef { Object } ValidatorOptions
 * @property { string } name - Property name
 * @property { string } type - Property type
 * @property { string } explain - Explain why property value invalid
 * @property { (value: T) => boolean } isTypeValid - Property type validator
 * @property { (value: T) => boolean } isValueValid - Property value validator
 */

/**
 * @template T
 * @param { ValidatorOptions } options
 * @return { (value: T) => void }
 */
const getPropertyValidator =
  ({ name, type, explain, isTypeValid, isValueValid }) =>
  (value) => {
    if (!isTypeValid(value)) {
      throw new PersonPropertyTypeError(name, type, value);
    }
    if (!isValueValid(value)) {
      throw new PersonPropertyValueError(name, explain);
    }
  };

export const PERSON_SCHEME = {
  validateName: getPropertyValidator({
    name: 'name',
    type: 'string',
    explain: 'expected length > 0',
    isTypeValid: (value) => typeof value === 'string',
    isValueValid: (value) => value.length > 0,
  }),
  validateAge: getPropertyValidator({
    name: 'age',
    type: 'string',
    explain: 'expected positive value',
    isTypeValid: (value) => typeof value === 'number',
    isValueValid: (value) => value >= 0,
  }),
  validateHobbies: getPropertyValidator({
    name: 'hobbies',
    type: 'Array',
    explain: 'expected all items in array to be string',
    isTypeValid: (value) => Array.isArray(value),
    isValueValid: (value) => value.every((item) => typeof item === 'string'),
  }),
};

/**
 * @param { * } maybePerson
 */
export const validatePerson = (maybePerson) => {
  const type = typeof maybePerson;
  if (type !== 'object') throw new PersonNotObjectError(type);
  PERSON_SCHEME.validateName(maybePerson.name);
  PERSON_SCHEME.validateAge(maybePerson.age);
  PERSON_SCHEME.validateHobbies(maybePerson.hobbies);
};
