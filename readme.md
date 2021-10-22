# Hello-world API

Hello-world API providing 2 features:

- Save / update a username and a date of birth
- returns hello birthday message for a given user

_Note: the application expect a mongodb instance running on default port 27017. Install & run mongo before starting the application. Additionally, you can specify a `MONGO_URL` in the `.env` configuration_

## run locally

```
npm i
npm start
```

Access the API on http://localhost:3000/hello/

## development server

If you want to run the development server

```
npm i
npm start:dev
```

## Test

```
npm i
npm test
```
