# Build stage
FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
COPY tsconfig.json ./
COPY public ./public
COPY src ./src
RUN npm install
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]