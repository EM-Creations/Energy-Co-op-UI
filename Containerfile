FROM node:22.14.0-alpine
MAINTAINER em-creations.co.uk
RUN addgroup app && adduser -S -G app app

WORKDIR /app
COPY ./ /app

RUN npm install

USER app
EXPOSE 4200
CMD ["npm", "run", "start"]
