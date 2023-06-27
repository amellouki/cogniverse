# Backend

Backend service that combines Pinecone's vector database and Langchain's GPT augmentation to deliver highly educated and data-aware responses

## Environment Variables

Create a `.env.local` file similar to `.env.example` and add your own variables.

## You need

Node 18.15.0+
npm 9.5.0+

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Prisma Schema

Create a `.env` file similar to `.env.example` and add your own variables.

Generate your SQL migration files and run them against the database

```bash
npm run prisma:migrate
```

After updating the Prisma models, in order to update the generated Prisma Client, run:

```bash
npm run prisma:generate
```


## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
