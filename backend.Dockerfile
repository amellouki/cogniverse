FROM node:18.16.0 as build

WORKDIR /app

RUN npm install -g @nestjs/cli

COPY package*.json ./
COPY packages/backend/package*.json ./packages/backend/
COPY packages/shared/package*.json ./packages/shared/

RUN npm install

COPY . .

RUN npm run prisma:generate

RUN npm run shared:build

RUN npm run backend:build

FROM node:18.16.0

WORKDIR /app

# Copy build folders
COPY --from=build /app/packages/backend/dist /app/packages/backend/dist
COPY --from=build /app/packages/shared/dist /app/packages/shared/dist

# Copy package.json and package-lock.json files
COPY --from=build /app/package*.json /app/
COPY --from=build /app/packages/backend/package*.json /app/packages/backend/
COPY --from=build /app/packages/shared/package*.json /app/packages/shared/

COPY --from=build /app/packages/backend/prisma /app/packages/backend/prisma

# Copy .env configs
COPY --from=build /app/packages/backend/.env* /app/packages/backend/

# Install production dependencies for backend
RUN npm ci --omit=dev

# Generate prisma client
RUN npm run prisma:generate

COPY --from=build /app/node_modules/@my-monorepo/shared /app/node_modules/@my-monorepo/shared

# Export port
EXPOSE 3001

CMD ["npm", "run", "start:backend:prod"]

