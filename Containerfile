FROM node:22.14.0-alpine
MAINTAINER em-creations.co.uk
EXPOSE 4200

WORKDIR /app
COPY ./ /app

RUN npm install

CMD ["npm", "run", "start"]
