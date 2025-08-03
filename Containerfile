FROM node:22.14.0-alpine
MAINTAINER em-creations.co.uk

WORKDIR /app
COPY . .

RUN mkdir /app/node_modules/.vite \
    && chown -R node:node /app/node_modules/.vite
RUN chown -R node:node /app
RUN chmod -R 755 /app

USER node

RUN npm install -g @angular/cli@16.2.0
RUN npm install

EXPOSE 4200

CMD ["npm", "run", "start"]
