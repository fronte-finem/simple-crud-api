# [<img src="https://rollingscopes.com/images/logo_rs2.svg" alt="Rolling Scopes School" width="100">][rss] ◽ [NodeJS Course][rss-nodejs] ◽ [2021Q4][schedule]

[logo]: https://rollingscopes.com/images/logo_rs2.svg
[rss]: https://rs.school
[rss-nodejs]: https://rs.school/nodejs/
[rss-nodejs-gh]: https://github.com/rolling-scopes-school/basic-nodejs-course
[schedule]: https://docs.google.com/spreadsheets/d/1XNsmckYlUy36kVTYrAylxpVYWTGvMc4RaS-xxgRbdmE/edit#gid=926002411

# Simple CRUD API

- [Task description][description] ([original][description-orig])
- [Cross-check criteria][cross-check] ([original][cross-check-orig])
- Timeline: [22.11.2021 - 28.11.2021][timeline]
- Development branch: [dev][dev-branch]
- Pull request: [pull-1][pull-request]

[description]: ./docs/description.md
[cross-check]: ./docs/cross-check.md
[dev-branch]: ../../tree/dev
[pull-request]: ../../pull/1
[timeline]: https://docs.google.com/spreadsheets/d/1XNsmckYlUy36kVTYrAylxpVYWTGvMc4RaS-xxgRbdmE/edit#gid=926002411&range=A12:E16
[description-orig]: https://github.com/rolling-scopes-school/basic-nodejs-course/blob/master/descriptions/simple-crud-api.md
[cross-check-orig]: https://github.com/rolling-scopes-school/basic-nodejs-course/blob/master/cross-check/simple-crud-api.md

## Setup (expected Nodejs 16.13.0 LTS):
```shell
git clone https://github.com/fronte-finem/simple-crud-api.git
cd simple-crud-api
npm install
echo 'PORT=8000' > .env
```
Last command for creating `.env` file with defined port.
Or you can rename existed file `.env.examle` to `.env`.

## Test:
```shell
npm run test
```

## Run in development or production mode:
```shell
npm run start:dev
npm run start:prod
```
You can use the [Postman](https://www.postman.com/downloads) for performing requests:
1. API path `/person`:
   - **GET** `/person` or `/person/${personId}` should return all persons or person with corresponding `personId`
   - **POST** `/person` is used to create record about new person and store it in database
   - **PUT** `/person/${personId}` is used to update record about existing person
   - **DELETE** `/person/${personId}` is used to delete record about existing person from database
2. Persons are stored as `objects` that have following properties:
   - `id` — unique identifier (`string`, `uuid`) generated on server side
   - `name` — person's name (`string`, **required**)
   - `age` — person's age (`number`, **required**)
   - `hobbies` — person's hobbies (`array` of `strings` or empty `array`, **required**)
3. Requests to non-existing endpoints (e.g. `/some-non/existing/resource`) return status 404 and human readable errors.
4. Internal server errors handled and processed correctly - status 500 and message with description.
You can test it by making requests on path `/person` using http-method **PATCH**
