FROM node:18.16.0 as build

WORKDIR /app

RUN npm install -g @nestjs/cli

COPY package*.json ./
COPY packages/frontend/package*.json ./packages/frontend/
COPY packages/backend/package*.json ./packages/backend/
COPY packages/shared/package*.json ./packages/shared/

RUN npm install

COPY . .

RUN npm run prisma:migrate
RUN npm run prisma:generate

RUN npm run shared:build

RUN npm run frontend:build

FROM node:18.16.0

WORKDIR /app

# Copy build folders
COPY --from=build /app/packages/frontend/.next /app/packages/frontend/.next

# Copy package.json and package-lock.json files
COPY --from=build /app/package*.json /app/
COPY --from=build /app/packages/frontend/package*.json /app/packages/frontend/
COPY --from=build /app/packages/backend/package*.json /app/packages/backend/

COPY --from=build /app/packages/backend/prisma /app/packages/backend/prisma


# Install production dependencies for frontend
RUN npm ci --omit=dev

# Install nestjs globally
RUN npm install -g @nestjs/cli

# Run migrations and generate prisma client
RUN npm run prisma:migrate
RUN npm run prisma:generate

# Expose port 3000
EXPOSE 3000

CMD ["npm", "run", "start:frontend:prod"]

