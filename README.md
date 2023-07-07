# Cogniverse
A web app that leverages LLMs through Langchain.\
_Aims at enabling fine-tuned prompting and UI to interact with the created agents._

Deployed at https://www.cogniverse.ai

**Currently supported LLMs:** chatGPT-3 (default) \
**Currently support vector stores:** Pinecone (default)

## Pre-requisites
Node `v18.16.0` \
npm `9.5.1` 

Run `nvm use` to use the correct node version.

## Environment variables
_(Follow the examples in the .env.example files)_
### Prisma variables
Create a `.env` file in /packages/backend/prisma with the following variables:
(follow the example in .env.example)

* `DATABASE_URL` denoting the database connection string

### Backend variables
Create a `.env.local` file in /packages/backend with the following variables:

* `OPEN_AI_API_KEY` Your organization's openAI api key
* `PINECONE_API_KEY` Your Pinecone api key
* `PINECONE_INDEX` Your Pinecone index name
* `PINECONE_ENVIRONMENT` Your Pinecone environment name
* `PORT` The port on which the backend server will run
* `ALLOWED_DOMAINS` The allowed domains for CORS 

### Frontend variables
Create a `.env.local` file in /packages/frontend with the following variables:

* `NEXT_PUBLIC_BACKEND_API` The backend api url (Port included if applicable)

## How to run the app

Install dependencies
```
npm install
```

Prisma schema migration

```
npm run prisma:migrate
```

Prisma generate client
```
npm run prisma:generate
```

Build shared types
```
npm run shared:build
```

Start backend server in development mode
```
npm run start:backend:dev
```

Start frontend server in development mode
```
npm run start:frontend:dev
```

## Validating Dockerfile locally

Build the image locally

```
docker build -t my-app-dev .
```

Run the image locally

```
docker run -p 3000:3000 -p 3001:3001 my-app-dev
```
