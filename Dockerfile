# Stage 1 - the build process
FROM node:12.14.1 as build-deps
WORKDIR /code
COPY frontend/ ./
RUN npm install
RUN npm run build


# Stage 2 - the production environment
FROM nginx:1.18.0-alpine
COPY --from=build-deps /code/build /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf
EXPOSE 5001
CMD ["nginx", "-g", "daemon off;"]
