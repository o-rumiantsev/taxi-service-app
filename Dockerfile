FROM node:latest

WORKDIR /app

COPY . /app

RUN yarn
RUN yarn build

CMD ["yarn", "start"]
