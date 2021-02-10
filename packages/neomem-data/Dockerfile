# FROM ubuntu:18.04
FROM node:8-alpine

COPY . /app

# Install dependencies
RUN npm install

# CMD node /app/src/index.js
# CMD npm start
CMD ["npm", "start"]