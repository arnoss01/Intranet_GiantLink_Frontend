FROM nginx:alpine
COPY ./dist/vuexy /usr/share/nginx/html
EXPOSE 80