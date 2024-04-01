FROM node:alpine

WORKDIR /app/angular

COPY . /app/angular
RUN npm install -g @angular/cli

RUN npm install

CMD ["ng", "serve", "--host", "0.0.0.0"]