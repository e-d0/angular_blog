FROM node:carbon

# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
COPY package*.json ./

RUN npm install && npm install -g pm2

# Bundle app source
COPY . .

EXPOSE 8200
CMD [ "npm", "run", "prod" ]