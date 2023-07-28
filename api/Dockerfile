FROM node:18
ARG EKS_ENV

ENV NODE_ENV prd
ENV MONGO_CONN mongodb+srv://api:yITw27S3eT67XlZf@urlshort.2wreelj.mongodb.net/?retryWrites=true&w=majority
ENV PORT 8000

WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8000
CMD ["npm", "start"]