FROM node:15

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY . .

# EXPOSE 8080

CMD [ "node", "src/gateway.js" ]
