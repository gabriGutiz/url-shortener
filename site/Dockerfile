FROM node:18-alpine AS build
WORKDIR /app

COPY . .

RUN npm install
RUN npm run build --prod

FROM nginx

COPY --from=build /app/dist/site /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
