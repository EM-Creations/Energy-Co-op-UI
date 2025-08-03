FROM node:22.14.0-alpine
MAINTAINER em-creations.co.uk

WORKDIR ./app
COPY . ./app

RUN npm install

EXPOSE 4200

CMD ["npm", "run", "start"]
