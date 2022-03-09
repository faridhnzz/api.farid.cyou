FROM node:16.13.2-slim

USER root
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install
COPY . .

EXPOSE 5400

CMD ["yarn", "start"]
