import supertestRequest from 'supertest';
import { randomUUID } from 'crypto';
import { getApp } from '../../src/app/index.js';
import { PersonNotFoundError } from '../../src/app/person/errors/error-not-found.js';
import { UuidError } from '../../src/errors/uuid-error.js';
import { PersonPropertyError } from '../../src/app/person/errors/error-property.js';
import { getRandomId, describe1, describe2, describe3 } from './helpers.js';

const app = getApp({ doLog: false });

const ROUTE = '/person';

const makePerson = (name, age, hobbies) => ({ name, age, hobbies });

const PERSON_1 = makePerson('Qwerty', 23, [...'🙈🙉🙊🐵']);
const PERSON_2 = makePerson('Йцукен', 45, [...'🍷🍸🍹🍺🥃']);

const postPerson = (person) =>
  supertestRequest(app)
    .post(ROUTE)
    .send(person)
    .then((res) => res.body.id);

const ID_1 = await postPerson(PERSON_1);
const ID_2 = await postPerson(PERSON_2);

// const IDs = await Promise.all(
//   [PERSON_1, PERSON_2].map((person) => postPerson(person))
// );

describe1(' SCENARIO ~2~ Errors: ', () => {
  describe2('1. Проверяем две предварительно созданные записи:', () => {
    it('Id должны совпадать с полученными при создании', async () => {
      const persons = await supertestRequest(app)
        .get(ROUTE)
        .then((res) => res.body);
      expect(persons).toHaveLength(2);
      expect(persons.map((p) => p.id).sort()).toEqual([ID_1, ID_2].sort());
    });
  });

  describe2('2. Проверяем работу с различными вариантами Id:', () => {
    makeIdTests('GET', 'получить');
    makeIdTests('PUT', 'обновить');
    makeIdTests('DELETE', 'удалить');
  });

  describe2('3. Проверяем работу с передачей невалидной записи:', () => {
    makeInvalidPropertyTest('POST', ROUTE, 'создать');
    makeInvalidPropertyTest('PUT', `${ROUTE}/${ID_1}`, 'обновить');
  });

  describe2('3. Проверяем работу с роутингом:', () => {
    const route = '/';
    describe(`пытаемся запросить путь [${route}]:`, () => {
      it(`ожидается статус код ${404} и сообщение, что путь [${route}] невалиден`, () =>
        supertestRequest(app)
          .get(route)
          .expect(404)
          .expect((res) => {
            const { message } = res.body;
            expect(message).toEqual(`Not Found — ${route}`);
          }));
    });
  });
});

function makeIdTests(method, action) {
  describe3(`${method.toUpperCase()}-запрос:`, () => {
    const [randomId, randomUuid] = [getRandomId(), randomUUID()];

    makeBadIdTest({
      testId: randomId,
      statusCode: 400,
      errorMessage: new UuidError(randomId).message,
      about: 'случайному Id неправильного формата',
      answer: 'Id не UUID',
    });

    makeBadIdTest({
      testId: randomUuid,
      statusCode: 404,
      errorMessage: new PersonNotFoundError(randomUuid).message,
      about: 'случайному UUID',
      answer: 'запись с таким Id не найдена',
    });

    makeGoodIdTest({
      testId: ID_2,
      statusCode: method === 'DELETE' ? 204 : 200,
      expectedPerson: method === 'DELETE' ? null : PERSON_2,
      answer: method === 'DELETE' ? '' : `запись с Id ${ID_2}`,
    });
  });

  function makeBadIdTest({ testId, statusCode, errorMessage, about, answer }) {
    describe(`пытаемся ${action} объект по ${about} (${testId}):`, () => {
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

  function makeGoodIdTest({ testId, statusCode, expectedPerson, answer }) {
    describe(`пытаемся ${action} объект по существующему Id (${testId}):`, () => {
      it(`ожидается статус код ${statusCode} ${answer}`, () =>
        supertestRequest(app)
          [method.toLowerCase()](`${ROUTE}/${testId}`)
          .send(PERSON_2)
          .expect(statusCode)
          .expect((res) => {
            if (!expectedPerson) {
              expect(res.body).toEqual({});
            } else {
              const { id, ...person } = res.body;
              expect(id).toEqual(testId);
              expect(person).toEqual(expectedPerson);
            }
          }));
    });
  }
}

function makeInvalidPropertyTest(method, route, action) {
  describe3(
    `${method}-запросом пытаемся ${action} объект без передачи:`,
    () => {
      makePostTest('name', 'expected not empty string');
      makePostTest('age', 'expected positive number');
      makePostTest('hobbies', 'expected array of strings or empty array');

      function makePostTest(propName, expectedMessage) {
        describe(`обязательного поля "${propName}":`, () => {
          it(`ожидается статус код 400 и сообщение, что в переданном объекте не хватает поля "${propName}"`, () => {
            const invalidPerson = { ...PERSON_1 };
            delete invalidPerson[propName];
            return supertestRequest(app)
              [method.toLowerCase()](route)
              .send(invalidPerson)
              .expect(400)
              .expect((res) => {
                const { message } = res.body;
                expect(message).toEqual(
                  new PersonPropertyError(propName, expectedMessage).message
                );
              });
          });
        });
      }
    }
  );
}
