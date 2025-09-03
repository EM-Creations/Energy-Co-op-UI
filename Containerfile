FROM node:22.14.0-alpine AS build
MAINTAINER em-creations.co.uk

ENV NODE_OPTIONS --max_old_space_size=1024

WORKDIR /app
COPY package*.json ./

#RUN mkdir /app/node_modules/.vite \
#    && chown -R node:node /app/node_modules/.vite
#RUN chown -R node:node /app
#RUN chmod -R 755 /app

#USER node

RUN npm ci

RUN npm install -g @angular/cli

COPY . .

RUN npm run build --configuration=production

FROM nginx:stable-alpine3.21-perl

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/energy-co-op-ui/browser /usr/share/nginx/html

EXPOSE 80
