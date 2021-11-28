import { randomUUID } from 'crypto';
import { randomDelay } from '../../utils/async.js';

/**
 * @param { Person } person
 * @return { Person }
 */
const clonePerson = ({ name, age, hobbies }) => ({
  name,
  age,
  hobbies: [...hobbies],
});

/**
 * @param { string } id
 * @param { Person } person
 * @return { PersonDatabaseItem }
 */
const makePersonDatabaseItem = (id, person) => ({ id, ...clonePerson(person) });

class PersonDatabase {
  /**
   * @type { Map<string, Person> }
   */
  #store = new Map();

  /**
   * @param { Person } person
   * @return { Promise<PersonDatabaseItem> }
   */
  async create(person) {
    await randomDelay();
    const id = randomUUID();
    this.#store.set(id, clonePerson(person));
    return makePersonDatabaseItem(id, person);
  }

  /**
   * @param { string } id
   * @return { Promise<MaybePersonDatabaseItem> }
   */
  async findByID(id) {
    if (!this.#store.has(id)) {
      return undefined;
    }
    await randomDelay();
    const person = this.#store.get(id);
    return makePersonDatabaseItem(id, person);
  }

  /**
   * @return { Promise<PersonDatabaseItem[]> }
   */
  async read() {
    await randomDelay();
    return [...this.#store.entries()].map((item) =>
      makePersonDatabaseItem(...item)
    );
  }

  /**
   * @param { string } id
   * @param { Person } person
   * @return { Promise<MaybePersonDatabaseItem> }
   */
  async update(id, person) {
    if (!this.#store.has(id)) {
      return undefined;
    }
    await randomDelay();
    this.#store.set(id, clonePerson(person));
    return makePersonDatabaseItem(id, person);
  }

  /**
   * @param { string } id
   * @return { Promise<MaybePersonDatabaseItem> }
   */
  async delete(id) {
    const maybePerson = await this.findByID(id);
    if (maybePerson) {
      await randomDelay();
      this.#store.delete(id);
    }
    return maybePerson;
  }
}

/**
 * @type { PersonDatabase }
 */
export const personDatabase = new PersonDatabase();
