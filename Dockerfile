FROM node:8.16.2-jessie
ADD . /var/app
WORKDIR /var/app
ENV PATH="/var/app/node_modules/.bin/:${PATH}"
RUN npm install
CMD npm start
EXPOSE 3001