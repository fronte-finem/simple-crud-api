import supertestRequest from 'supertest';
import { setTimeout } from 'timers/promises';
import { getApp } from '../../src/app/index.js';
import { describe1, describe2 } from '../helpers.js';
import { ROUTE } from '../constants.js';

await setTimeout(1000);

const app = getApp({ doLog: false });

describe1('SCENARIO ~5~ Error 500:', () => {
  describe2(
    '1. PATCH-запросом пытаемся несколько раз обратиться к роуту [person]:',
    () => {
      Array(10).fill(0).forEach(makePatchTest);
    }
  );
});

function makePatchTest() {
  it(`ожидается статус код 500 и случайная внутрення ошибка сервера`, () =>
    supertestRequest(app)
      .patch(ROUTE)
      .send({ name: 'Uiop' })
      .expect(500)
      .expect((res) => {
        const { message } = res.body;
        expect(message.startsWith('Internal Server Error')).toBe(true);
      }));
}
