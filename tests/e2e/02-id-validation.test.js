import supertestRequest from 'supertest';
import { setTimeout } from 'timers/promises';
import { randomUUID } from 'crypto';
import { getApp } from '../../src/app/index.js';
import { PersonNotFoundError } from '../../src/app/person/errors/error-not-found.js';
import { UuidError } from '../../src/errors/uuid-error.js';
import {
  getRandomId,
  describe1,
  describe2,
  describe3,
  postPerson,
} from '../helpers.js';
import { PERSON_1, PERSON_2, ROUTE } from '../constants.js';

await setTimeout(250);

const app = getApp({ doLog: false });

const PERSON_1_ID = await postPerson(app, ROUTE, PERSON_1);

describe1('SCENARIO ~2~ ID Validation:', () => {
  describe2(
    `1. Проверяем что в базе есть запись Person с Id [${PERSON_1_ID}]:`,
    () => {
      it('ожидается статус код 200 и объект с таким Id.', () =>
        supertestRequest(app)
          .get(`${ROUTE}/${PERSON_1_ID}`)
          .expect(200)
          .expect((res) => {
            const { id, ...person } = res.body;
            expect(id).toEqual(PERSON_1_ID);
            expect(person).toEqual(PERSON_1);
          }));
    }
  );

  describe2('2. GET-запрос:', () => {
    makeIdTests('GET', 'получить');

    describe3(
      `d) пытаемся получить объект по существующему Id — роут [${ROUTE}/${PERSON_1_ID}]:`,
      () => {
        it(`ожидается статус код 200 и сохраненная запись с этим Id`, () =>
          supertestRequest(app)
            .get(`${ROUTE}/${PERSON_1_ID}`)
            .expect(200)
            .expect((res) => {
              const { id, ...person } = res.body;
              expect(id).toEqual(PERSON_1_ID);
              expect(person).toEqual(PERSON_1);
            }));
      }
    );
  });

  describe2('2. PUT-запрос:', () => {
    makeIdTests('PUT', 'обновить');

    describe3(
      `d) пытаемся обновить объект по существующему Id — роут [${ROUTE}/${PERSON_1_ID}]:`,
      () => {
        it(`ожидается статус код 200 и обновлённая запись с этим Id`, () =>
          supertestRequest(app)
            .put(`${ROUTE}/${PERSON_1_ID}`)
            .expect(200)
            .send(PERSON_2)
            .expect((res) => {
              const { id, ...person } = res.body;
              expect(id).toEqual(PERSON_1_ID);
              expect(person).toEqual(PERSON_2);
            }));
      }
    );
  });

  describe2('2. DELETE-запрос:', () => {
    makeIdTests('DELETE', 'удалить');

    describe3(
      `d) пытаемся удалить объект по существующему Id — роут [${ROUTE}/${PERSON_1_ID}]:`,
      () => {
        it(`ожидается статус код 204 в подтверждение успешного удаления.`, () =>
          supertestRequest(app).delete(`${ROUTE}/${PERSON_1_ID}`).expect(204));
      }
    );
  });

  describe2(
    `5. Проверяем, что запись Person с Id [${PERSON_1_ID}] удалена:`,
    () => {
      it('ожидается статус код 404 и сообщение, что такого объекта нет.', () =>
        supertestRequest(app)
          .get(`${ROUTE}/${PERSON_1_ID}`)
          .send(PERSON_1)
          .expect(404)
          .expect((res) => {
            const { message } = res.body;
            expect(message).toEqual(
              new PersonNotFoundError(PERSON_1_ID).message
            );
          }));
    }
  );
});

function makeIdTests(method, action) {
  const [randomId, randomUuid] = [getRandomId(), randomUUID()];

  makeBadIdTest({
    pos: 'a',
    testId: '',
    statusCode: 400,
    errorMessage: new UuidError('').message,
    about: 'пустому ID',
    answer: "[''] не UUID",
  });

  makeBadIdTest({
    pos: 'b',
    testId: randomId,
    statusCode: 400,
    errorMessage: new UuidError(randomId).message,
    about: 'случайному Id неправильного формата',
    answer: `[${randomId}] не UUID`,
  });

  makeBadIdTest({
    pos: 'c',
    testId: randomUuid,
    statusCode: 404,
    errorMessage: new PersonNotFoundError(randomUuid).message,
    about: 'случайному UUID',
    answer: 'запись с таким Id не найдена',
  });

  function makeBadIdTest({
    pos,
    testId,
    statusCode,
    errorMessage,
    about,
    answer,
  }) {
    describe(`${pos}) пытаемся ${action} объект по ${about} — роут [${ROUTE}/${testId}]:`, () => {
      it(`ожидается статус код ${statusCode} и сообщение, что ${answer}`, () =>
        supertestRequest(app)
          [method.toLowerCase()](`${ROUTE}/${testId}`)
          .send(PERSON_1)
          .expect(statusCode)
          .expect((res) => {
            const { message } = res.body;
            expect(message).toEqual(errorMessage);
          }));
    });
  }
}
