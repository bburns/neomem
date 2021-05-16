FROM node:15

WORKDIR /usr/src/app

COPY package.json ./
COPY package.lock.json ./

RUN npm ci --only=production

COPY . .

EXPOSE 8080

CMD [ "node", "src/gateway.js" ]
