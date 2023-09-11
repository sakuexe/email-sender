FROM node

WORKDIR /usr/src/app/email-api

ENV DEV_USERNAME="dev"
ENV DEV_PASSWORD="1234"
# add the following environment variables to your .env file
# or add them to the container run command
# EMAIL="email@example.com"
# GMAIL_PASSWORD="example1234"
# USERNAME="production_admin"
# PASSWORD="production1234"

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "run", "start"]

EXPOSE 5000
