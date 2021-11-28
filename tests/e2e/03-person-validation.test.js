import supertestRequest from 'supertest';
import { setTimeout } from 'timers/promises';
import { getApp } from '../../src/app/index.js';
import { PersonPropertyError } from '../../src/app/person/errors/error-property.js';
import { describe1, describe2, describe3 } from '../helpers.js';
import { PERSON_1, PERSON_2, ROUTE, UUID_LENGTH } from '../constants.js';

await setTimeout(500);

const app = getApp({ doLog: false });

const STORE = {
  id: '',
  getRoute() {
    return `${ROUTE}/${this.id}`;
  },
};

describe1('SCENARIO ~3~ Person Validation:', () => {
  makeInvalidPropertyTest(1, 'POST', 'создать');

  describe3(
    '2. POST-запросом пытаемся создать запись отправив валидный объект:',
    () => {
      it('ожидается статус код 201 и свежесозданный объект с Id.', () =>
        supertestRequest(app)
          .post(ROUTE)
          .send(PERSON_1)
          .expect(201)
          .expect((res) => {
            const { id, ...person } = res.body;
            STORE.id = id;
            expect(typeof id === 'string').toBe(true);
            expect(person).toEqual(PERSON_1);
          }));
    }
  );

  describe2(
    '3. GET-запросом пытаемся получить созданную запись по его Id:',
    () => {
      it('ожидается статус код 200 и созданный объект.', () => {
        expect(STORE.id).toHaveLength(UUID_LENGTH);
        return supertestRequest(app)
          .get(STORE.getRoute())
          .expect(200)
          .expect((res) => {
            const { id, ...person } = res.body;
            expect(id).toEqual(STORE.id);
            expect(person).toEqual(PERSON_1);
          });
      });
    }
  );

  makeInvalidPropertyTest(4, 'PUT', 'обновить созданную');

  describe3(
    '5. PUT-запросом пытаемся обновить созданную запись отправив валидный объект:',
    () => {
      it('ожидается статус код 200 и обновленный объект с тем же id.', () => {
        expect(STORE.id).toHaveLength(UUID_LENGTH);
        return supertestRequest(app)
          .put(STORE.getRoute())
          .send(PERSON_2)
          .expect(200)
          .expect((res) => {
            const { id, ...person } = res.body;
            expect(id).toEqual(STORE.id);
            expect(person).toEqual(PERSON_2);
          });
      });
    }
  );
});

function makeInvalidPropertyTest(index, method, action) {
  describe2(
    `${index}. ${method}-запросом пытаемся ${action} запись без передачи:`,
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
              [method.toLowerCase()](
                method === 'POST' ? ROUTE : STORE.getRoute()
              )
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
