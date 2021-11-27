import supertestRequest from 'supertest';
import { getApp } from '../../src/app/index.js';
import { PersonNotFoundError } from '../../src/app/person/errors/error-not-found.js';
import { describe1, describe2 } from './helpers.js';

const app = getApp({ doLog: false });

const ROUTE = '/person';

const UUID_LENGTH = 36;

const makePerson = (name, age, hobbies) => ({ name, age, hobbies });

const PERSON_1 = makePerson('Qwerty', 23, [...'🙈🙉🙊🐵']);
const PERSON_2 = makePerson('Йцукен', 45, [...'🍷🍸🍹🍺🥃']);

describe1(' SCENARIO ~1~ Cross-check example: ', () => {
  let testId = '';

  describe2('1. GET-запросом получаем все объекты:', () => {
    it('ожидается статус код 200 и пустой массив.', () =>
      supertestRequest(app)
        .get(ROUTE)
        .expect(200)
        .expect((res) => {
          expect(res.body).toEqual([]);
        }));
  });

  describe2('2. POST-запросом создается новый объект:', () => {
    it('ожидается статус код 201 и свежесозданный объект с Id.', () =>
      supertestRequest(app)
        .post(ROUTE)
        .send(PERSON_1)
        .expect(201)
        .expect((res) => {
          const { id, ...person } = res.body;
          testId = id;
          expect(typeof id === 'string').toBe(true);
          expect(id).toHaveLength(UUID_LENGTH);
          expect(person).toEqual(PERSON_1);
        }));
  });

  describe2(
    '3. GET-запросом пытаемся получить созданный объект по его Id:',
    () => {
      it('ожидается статус код 200 и созданный объект.', () => {
        expect(testId).toHaveLength(UUID_LENGTH);
        return supertestRequest(app)
          .get(`${ROUTE}/${testId}`)
          .expect(200)
          .expect((res) => {
            const { id, ...person } = res.body;
            expect(id).toEqual(testId);
            expect(person).toEqual(PERSON_1);
          });
      });
    }
  );

  describe2('4. PUT-запросом пытаемся обновить созданный объект:', () => {
    it('ожидается статус код 200 и обновленный объект с тем же id.', () => {
      expect(testId).toHaveLength(UUID_LENGTH);
      return supertestRequest(app)
        .put(`${ROUTE}/${testId}`)
        .send(PERSON_2)
        .expect(200)
        .expect((res) => {
          const { id, ...person } = res.body;
          expect(id).toEqual(testId);
          expect(person).toEqual(PERSON_2);
        });
    });
  });

  describe2(
    '5. DELETE-запросом пытаемся удалить созданный объект по Id:',
    () => {
      it('ожидается статус код 204 в подтверждение успешного удаления.', () => {
        expect(testId).toHaveLength(UUID_LENGTH);
        return supertestRequest(app)
          .delete(`${ROUTE}/${testId}`)
          .expect(204)
          .expect((res) => {
            expect(res.body).toEqual({});
          });
      });
    }
  );

  describe2('6. GET-запросом пытаемся получить удаленный объект по Id:', () => {
    it('ожидается статус код 404 и сообщение, что такого объекта нет.', () => {
      expect(testId).toHaveLength(UUID_LENGTH);
      return supertestRequest(app)
        .get(`${ROUTE}/${testId}`)
        .expect(404)
        .expect((res) => {
          const { message } = res.body;
          expect(message).toEqual(new PersonNotFoundError(testId).message);
        });
    });
  });
});
