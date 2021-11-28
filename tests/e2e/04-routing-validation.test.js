import supertestRequest from 'supertest';
import { setTimeout } from 'timers/promises';
import { randomUUID } from 'crypto';
import { getApp } from '../../src/app/index.js';
import { describe1, describe2 } from '../helpers.js';
import { ROUTE } from '../constants.js';
import { UuidError } from '../../src/errors/uuid-error.js';

await setTimeout(750);

const app = getApp({ doLog: false });

const ID = randomUUID();
const ID_ROUTE = `${ROUTE}/${ID}`;

const BAD_ROUTES = ['/', '//', '///', '/foo', '/foo/bar', '/foo/bar/baz'];
const BAD_PERSON_ROUTES = [
  `${ID_ROUTE}/`,
  `${ID_ROUTE}/foo`,
  `${ID_ROUTE}/foo/bar`,
];

describe1('SCENARIO ~4~ Routing Validation:', () => {
  describe2(
    '1. GET-запросом пытаемся запросить путь отличный от [person]:',
    () => {
      BAD_ROUTES.forEach((route) => makeRoutingTest(route));
    }
  );

  describe2('2. GET-запросом пытаемся запросить путь [person]:', () => {
    describe(`http://localhost${ROUTE}`, () => {
      it(`ожидается статус код ${200} и пустой массив`, () =>
        supertestRequest(app)
          .get(ROUTE)
          .expect(200)
          .expect((res) => {
            expect(res.body).toEqual([]);
          }));
    });

    describe(`http://localhost${ROUTE}/`, () => {
      it(`ожидается статус код ${400} и сообщение, что пустая строка не UUID`, () =>
        supertestRequest(app)
          .get(`${ROUTE}/`)
          .expect(400)
          .expect((res) => {
            const { message } = res.body;
            expect(message).toEqual(new UuidError('').message);
          }));
    });

    describe(`http://localhost${ID_ROUTE}`, () => {
      it(`ожидается статус код ${404} и сообщение, что запись с таким ID не найдена`, () =>
        supertestRequest(app)
          .get(ID_ROUTE)
          .expect(404)
          .expect((res) => {
            const { message } = res.body;
            expect(message).toEqual(`Person with ID '${ID}' not found!`);
          }));
    });

    BAD_PERSON_ROUTES.forEach((route) => makePersonRoutingTest(route));
  });
});

function makeRoutingTest(route, status = 404) {
  describe(`http://localhost${route}`, () => {
    it(`ожидается статус код ${status} и сообщение, что путь [${route}] невалиден`, () =>
      supertestRequest(app)
        .get(route)
        .expect(status)
        .expect((res) => {
          const { message } = res.body;
          expect(message).toEqual(`Not Found — ${route}`);
        }));
  });
}

function makePersonRoutingTest(route, status = 400) {
  describe(`http://localhost${route}`, () => {
    it(`ожидается статус код ${status} и сообщение, что запрос c таким путем невалиден`, () =>
      supertestRequest(app)
        .get(route)
        .expect(status)
        .expect((res) => {
          const { message } = res.body;
          expect(message).toEqual(`Bad Request — Path not valid '${route}'`);
        }));
  });
}
