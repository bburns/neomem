FROM node:15

WORKDIR /usr/src/app

COPY package.json ./

# RUN npm ci --only=production
RUN npm install

COPY . .

EXPOSE 8080

CMD [ "node", "src/gateway.js" ]
