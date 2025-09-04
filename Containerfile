FROM node:22.14.0-alpine AS build
MAINTAINER em-creations.co.uk

ENV NODE_OPTIONS --max_old_space_size=1024

RUN npm install -g @angular/cli

WORKDIR /app
COPY package*.json ./

RUN npm ci

COPY . .

RUN chmod -R 755 /app
RUN chown -R 755 /app/node_modules
RUN chmod +x /app/node_modules/@esbuild/linux-x64/bin/esbuild

RUN npm run build --configuration=production

FROM nginx:stable-alpine3.21-perl

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/energy-co-op-ui/browser /usr/share/nginx/html

EXPOSE 80
