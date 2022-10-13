FROM node:alpine

WORKDIR /json-server

RUN npm i -g json-server

COPY db.json ./

CMD ["json-server", "--host", "0.0.0.0","--watch", "db.json", "--port", "3030"]
