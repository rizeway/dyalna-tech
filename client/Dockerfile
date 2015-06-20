FROM node:0.12
VOLUME /code
WORKDIR /code
RUN npm -g install gulp bower
EXPOSE 8000
ENTRYPOINT cp config/config.js.dist config/config.js \
  && npm install && bower install --allow-root \
  && gulp build serve
