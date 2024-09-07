# Cogniverse.ai (No longer maintained or hosted)
A web app that leverages LLMs through Langchain.\
_Pre prompt your bots and integrate them with messaging platforms such us Discord and Slack._

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

#### Security
* `PORT` The port on which the backend server will run
* `ALLOWED_DOMAINS` The allowed domains for CORS
* `JWT_SECRET` The secret used to sign JWT tokens

#### OpenAI
* `OPEN_AI_API_KEY` Your organization's openAI api key

#### Pinecone
* `PINECONE_API_KEY` Your Pinecone api key
* `PINECONE_INDEX` Your Pinecone index name
* `PINECONE_ENVIRONMENT` Your Pinecone environment name

#### Authentication
* `GITHUB_OAUTH_CLIENT_SECRET` Github oauth client secret
* `GITHUB_OAUTH_CLIENT_ID` Github oauth client id

* `DISCORD_OAUTH_CLIENT_SECRET` The client secret for discord oauth
* `DISCORD_OAUTH_CLIENT_ID` The client id for discord oauth
* `DISCORD_OAUTH_REDIRECT_URI` The redirect uri for discord oauth

#### Bot Integration
* `DISCORD_BOT_TOKEN` Your discord bot token

* `SLACK_BOT_TOKEN` Your slack bot token
* `SLACK_SIGNING_SECRET` Your slack signing secret


### Frontend variables
Create a `.env.local` file in /packages/frontend with the following variables:

* `NEXT_PUBLIC_BACKEND_API` The backend api url (Port included if applicable)
* `NEXT_PUBLIC_GITHUB_OAUTH_CLIENT_ID` GITHUB OAUTH CLIENT ID
* `NEXT_PUBLIC_DISCORD_OAUTH_CLIENT_ID` DISCORD OAUTH CLIENT ID
* `NEXT_PUBLIC_DISCORD_OAUTH_URL` DISCORD OAUTH URL

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
docker build -t cogniverse-frontend . -f frontend.Dockerfile
```


```
docker build -t cogniverse-backend . -f backend.Dockerfile
```
