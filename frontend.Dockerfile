FROM node:18.16.0 as build

WORKDIR /app

COPY package*.json ./
COPY packages/frontend/package*.json ./packages/frontend/
COPY packages/shared/package*.json ./packages/shared/

RUN npm install

COPY . .

RUN npm run shared:build

RUN npm run frontend:build

FROM node:18.16.0

WORKDIR /app

# Copy build folders
COPY --from=build /app/packages/frontend/.next /app/packages/frontend/.next

# Copy package.json and package-lock.json files
COPY --from=build /app/package*.json /app/
COPY --from=build /app/packages/frontend/package*.json /app/packages/frontend/


# Install production dependencies for frontend
RUN npm ci --omit=dev

# Expose port 3000
EXPOSE 3000

CMD ["npm", "run", "start:frontend:prod"]

