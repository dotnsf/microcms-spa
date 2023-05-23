# https://qiita.com/291dev/items/53f00265812e7e934dec

# base image #1
FROM node:16-alpine as node

COPY . /usr/src/app
WORKDIR /usr/src/app

# https://stackoverflow.com/questions/29141153/nodejs-npm-err-code-self-signed-cert-in-chain
RUN npm set strict-ssl false

RUN npm install --fetch-timeout=600000 && npm run build

# base image #2
#FROM nginx:1.19.2-alpine
FROM nginxinc/nginx-unprivileged:alpine

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=node /usr/src/app/build /usr/share/nginx/html

EXPOSE 8080
CMD [ "nginx", "-g", "daemon off;" ]

