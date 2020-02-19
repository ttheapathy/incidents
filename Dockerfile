# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM node:13.8.0-alpine as builder

WORKDIR /app

COPY package*.json /app/

RUN npm install

COPY ./ /app/

RUN npm run build

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx

#FROM nginx:1.17.6-alpine as app

#RUN mkdir -p /home/app

#RUN mkdir -p /home/app/build

#WORKDIR /home/app/

#COPY --from=builder /app/build /build

FROM nginx:1.17.6-alpine

RUN mkdir -p /home/app

RUN mkdir -p /home/app/build

COPY --from=builder /app/build /home/app/build

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d