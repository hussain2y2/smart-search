## Installation

Clone the repository and run the following command in the project directory.
```bash
$ yarn install
# OR
$ npm run install
```

## CSV to JSON

Run the following command to convert the data in csv to json:
```bash
$ ts-node convert-csv-to-json.ts
```
and then run:
```bash
$ ts-node src/seed.ts
```
to import data into the database.

*Note:* Make sure to create the database before running the above command.

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## What to improve

1. Use `.env` file to storing the database and any other credentials.
2. Write unit tests to make sure what is requested is running.
3. ...
