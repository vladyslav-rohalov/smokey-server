# Base image
FROM node:18

# Create app directory
WORKDIR /usr/src/app

RUN npm i -g npm@10.2.5 
# RUN npm install --force sharp@0.32.6 --arch=x64 --platform=linux
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Copy the .env and .env.development files
COPY .env.production ./

# Creates a "dist" folder with the production build
RUN npm run build

# Expose the port on which the app will run
EXPOSE 5000

CMD [ "npm", "run", "start" ]

