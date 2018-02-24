FROM node

RUN mkdir -p /www
WORKDIR /www

COPY package.json /www/
RUN npm install

COPY . /www

RUN npm install --global nodemon
CMD [ "npm", "start" ]
