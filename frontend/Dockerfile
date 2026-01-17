# DEV 
FROM node:20-slim AS dev

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5173
CMD ["npm", "run", "dev","--","--host"]

# BUILD
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# PROD
FROM nginx:alpine AS prod

COPY --from=builder /app/dist /usr/share/nginx/html

RUN echo 'server { \
  listen 80; \
  location / { \
    root /usr/share/nginx/html; \
    try_files $uri $uri/ /index.html; \
  } \
  location /api { \
    proxy_pass http://backend:8080; \
    proxy_set_header Host $host; \
    proxy_set_header X-Real-IP $remote_addr; \
  } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80
