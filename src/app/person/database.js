import { randomUUID } from 'crypto';

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
const makePersonDatabaseItem = (id, person) => clonePerson({ id, ...person });

class PersonDatabase {
  /**
   * @type { PersonDatabaseItem[] }
   */
  #store = [];

  /**
   * @param { Person } person
   * @return { PersonDatabaseItem }
   */
  create(person) {
    const id = randomUUID();
    const item = makePersonDatabaseItem(id, person);
    this.#store.push(item);
    return clonePerson(item);
  }

  /**
   * @param { string } id
   * @return { MaybePersonDatabaseItem }
   */
  findByID(id) {
    return this.#store.find(isPersonId(id));
  }

  /**
   * @param { string } id
   * @return { number }
   */
  findIndexByID(id) {
    return this.#store.findIndex(isPersonId(id));
  }

  /**
   * @return { PersonDatabaseItem[] }
   */
  read() {
    return this.#store.map(clonePerson);
  }

  /**
   * @param { string } id
   * @param { Person } person
   * @return { MaybePersonDatabaseItem }
   */
  update(id, person) {
    const index = this.findIndexByID(id);
    if (index < 0) {
      return undefined;
    }
    const item = makePersonDatabaseItem(id, person);
    this.#store[index] = item;
    return clonePerson(item);
  }

  /**
   * @param { string } id
   * @return { MaybePersonDatabaseItem }
   */
  delete(id) {
    const maybePerson = this.findByID(id);
    if (maybePerson) {
      this.#store.filter(isNotPersonId(id));
    }
    return maybePerson;
  }
}

/**
 * @type { PersonDatabase }
 */
export const personDatabase = new PersonDatabase();
