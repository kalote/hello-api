# Hello-world API

Hello-world API providing 2 features:

- Save / update a username and a date of birth
- returns hello birthday message for a given user

_Note: the application expect a mongodb instance running on default port 27017. Install & run mongo before starting the application. Additionally, you can specify a `MONGO_URL` in the `.env` configuration_

## run locally

Create a `.env` file with the following elements:

```
MONGO_URL=mongodb://localhost:27017/hello-api
PORT=3000
```

Then run:

```
npm i
npm start
```

Access the API on http://localhost:3000/:

- GET /\_meta/health: liveness check
- GET /\_meta/ready: readiness check
- PUT /hello/:username + {dateOfBirth: 'YYYY-MM-DD'}: save/update info
- GET /hello/:username: returns hello birthday message

## development server

If you want to run the development server

```
npm i
npm start:dev
```

## Test

To run the test (make sure Mongo is running):

```
npm i
npm test
```
