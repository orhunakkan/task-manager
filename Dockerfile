# Build stage for React client
FROM node:18-alpine as client-builder
WORKDIR /app/client
COPY client/package*.json ./
RUN npm install
COPY client/ ./
RUN npm run build

# Build stage for Node.js server
FROM node:18-alpine as server-builder
WORKDIR /app/server
COPY server/package*.json ./
RUN npm install
COPY server/ ./
RUN npm run build

# Final production stage
FROM node:18-alpine
WORKDIR /app
COPY --from=server-builder /app/server/package*.json ./
COPY --from=server-builder /app/server/dist ./dist
COPY --from=client-builder /app/client/build ./public
RUN npm install --production

# Set environment variables
ENV PORT=3000
ENV MONGODB_URI=${MONGODB_URI}
EXPOSE 3000

CMD ["node", "dist/app.js"]