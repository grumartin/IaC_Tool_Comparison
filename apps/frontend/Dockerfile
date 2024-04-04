FROM node:18.16.0-alpine3.17 AS development
WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install
COPY . ./
EXPOSE 3000
CMD ["node", "./src/app.js"]
