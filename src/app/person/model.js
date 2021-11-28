/**
 * @typedef { Object } Person
 * @property { string } name - person's name (`string`, **required**)
 * @property { number } age - person's age (`number`, **required**)
 * @property { string[] } hobbies - person's hobbies (`array` of `strings` or empty `array`, **required**)
 */

/**
 * @typedef { Object } DatabaseItem
 * @property { string } id - unique identifier (`string`, `uuid`) generated on server side
 */

/**
 * @typedef { DatabaseItem & Person } PersonDatabaseItem
 */

/**
 * @typedef { PersonDatabaseItem | undefined } MaybePersonDatabaseItem
 */
