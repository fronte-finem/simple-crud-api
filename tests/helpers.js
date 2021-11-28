import supertestRequest from 'supertest';
import { colorize } from '../src/logging/index.js';

export const describe1 = (name, func) => {
  const block = colorize(`  ${name}  `, { fg: '#F80', bg: '#000' });
  return describe(`\n  ${block}  \n`, func);
};

export const describe2 = (name, func) =>
  describe(colorize(name, { fg: '#08F' }), func);

export const describe3 = (name, func) =>
  describe(colorize(name, { fg: '#0F8' }), func);

export const getRandomId = () => Math.random().toString(16).slice(2);

/**
 * @param { string } name
 * @param { number } age
 * @param { string[] } hobbies
 * @return { Person }
 */
export const makePerson = (name, age, hobbies) => ({ name, age, hobbies });

/**
 * @param { (req: AppRequest, res: AppResponse) => Promise<void> } app
 * @param { string } route
 * @param { Person } person
 * @return { Promise<string> }
 */
export const postPerson = (app, route, person) =>
  supertestRequest(app)
    .post(route)
    .send(person)
    .then((res) => res.body.id);
