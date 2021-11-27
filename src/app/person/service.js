import { randomUUID } from 'crypto';
import { randomDelay } from '../../utils/async.js';

/**
 * @param { string } id
 * @return { (person: PersonDatabaseItem) => boolean }
 */
const isPersonId = (id) => (person) => person.id === id;

/**
 * @param { string } id
 * @return { (person: PersonDatabaseItem) => boolean }
 */
const isNotPersonId = (id) => (person) => person.id !== id;

/**
 * @param { PersonDatabaseItem } person
 * @return { PersonDatabaseItem }
 */
const clonePerson = ({ hobbies, ...rest }) => ({
  ...rest,
  hobbies: [...hobbies],
});

/**
 * @param { string } id
 * @param { Person } person
 * @return { PersonDatabaseItem }
 */
const makePersonDatabaseItem = (id, person) => clonePerson({ ...person, id });

class PersonDatabase {
  /**
   * @type { PersonDatabaseItem[] }
   */
  #store = [];

  /**
   * @param { Person } person
   * @return { Promise<PersonDatabaseItem> }
   */
  async create(person) {
    await randomDelay();
    const id = randomUUID();
    const item = makePersonDatabaseItem(id, person);
    this.#store.push(item);
    return clonePerson(item);
  }

  /**
   * @param { string } id
   * @return { Promise<MaybePersonDatabaseItem> }
   */
  async findByID(id) {
    await randomDelay();
    return this.#store.find(isPersonId(id));
  }

  /**
   * @param { string } id
   * @return { Promise<number> }
   */
  async findIndexByID(id) {
    await randomDelay();
    return this.#store.findIndex(isPersonId(id));
  }

  /**
   * @return { Promise<PersonDatabaseItem[]> }
   */
  async read() {
    await randomDelay();
    return this.#store.map(clonePerson);
  }

  /**
   * @param { string } id
   * @param { Person } person
   * @return { Promise<MaybePersonDatabaseItem> }
   */
  async update(id, person) {
    const index = await this.findIndexByID(id);
    if (index < 0) {
      return undefined;
    }
    await randomDelay();
    const item = makePersonDatabaseItem(id, person);
    this.#store[index] = item;
    return clonePerson(item);
  }

  /**
   * @param { string } id
   * @return { Promise<MaybePersonDatabaseItem> }
   */
  async delete(id) {
    const maybePerson = await this.findByID(id);
    if (maybePerson) {
      await randomDelay();
      this.#store = this.#store.filter(isNotPersonId(id));
    }
    return maybePerson;
  }
}

/**
 * @type { PersonDatabase }
 */
export const personDatabase = new PersonDatabase();
