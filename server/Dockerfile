FROM node:0.12
VOLUME /code
WORKDIR /code
EXPOSE 8800
RUN apt-get update && apt-get install -y netcat
ENTRYPOINT while true;do nc -v -z -w 3 $MYSQL_HOST 3306 && break; sleep 1; done \
  && cp src/config/config.js.dist src/config/config.js \
  && cp src/config/migration.json.dist src/config/migration.json \
  && npm install \
  && ./node_modules/.bin/db-migrate up --env production --migrations-dir src/migrations/ --config src/config/migration.json \
  && node src/server.js
