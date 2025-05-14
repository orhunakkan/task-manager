# Build stage for React client
FROM node:slim-alpine AS client-builder
WORKDIR /app/client
COPY client/package*.json ./
RUN npm install
COPY client/ ./
RUN npm run build

# Build stage for Node.js server
FROM node:slim-alpine AS server-builder
WORKDIR /app/server
COPY server/package*.json ./
RUN npm install
COPY server/ ./
RUN npm run build

# Final production stage
FROM node:slim-alpine
WORKDIR /app
COPY --from=server-builder /app/server/package*.json ./
COPY --from=server-builder /app/server/dist ./dist
COPY --from=client-builder /app/client/build ./public
RUN npm install --production

ENV PORT=8080
EXPOSE 8080

CMD ["node", "dist/app.js"]