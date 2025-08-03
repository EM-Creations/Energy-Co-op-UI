FROM node:22.14.0-alpine
MAINTAINER em-creations.co.uk
EXPOSE 4200

WORKDIR /usr/app
COPY ./ /usr/app

RUN npm install -g @angular/cli
RUN npm install

CMD ["npm", "run", "start"]
