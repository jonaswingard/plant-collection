FROM node

RUN mkdir -p /www
WORKDIR /www

COPY package.json /www/
RUN npm install

COPY . /www

EXPOSE 4200

CMD [ "npm", "start" ]
