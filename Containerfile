FROM node:22.14.0-alpine
MAINTAINER em-creations.co.uk

WORKDIR /app
COPY . .

RUN mkdir /app/node_modules/.vite \
    && chown -R node:node /app/node_modules/.vite

USER node

RUN npm install

EXPOSE 4200

CMD ["npm", "run", "start"]
