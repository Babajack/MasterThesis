# FROM node:lts-alpine
# ENV NODE_ENV=production
# WORKDIR /usr/src/app
# COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
# RUN npm install --production --silent && mv node_modules ../
# COPY . .
# EXPOSE 3000
# #RUN chown -R node /usr/src/app
# #USER node
# CMD ["npm", "start"]



# # pull official base image
# FROM node:lts-alpine

# # set working directory
# WORKDIR /usr/src/app

# # add `/app/node_modules/.bin` to $PATH
# ENV PATH /usr/src/app/node_modules/.bin:$PATH

# # install app dependencies
# COPY package.json ./
# COPY package-lock.json ./
# RUN npm install 
# RUN npm install react-scripts@3.4.1 -g 

# # add app
# COPY . ./

# EXPOSE 3000

# # start app
# CMD ["npm", "start"]

# Stage 1: Install dependencies and build the React application
FROM node:16 as build

WORKDIR /app

ENV PATH /usr/src/app/node_modules/.bin:$PATH

# Copy package.json and package-lock.json/yarn.lock
COPY package*.json ./

# Install all dependencies (both dev and production for flexibility)
RUN npm install
RUN npm install react-scripts@3.4.1 -g 

# Copy the rest of the application code
COPY . .

# Accept a build mode argument. Default is "production".
ARG BUILD_MODE=production

# Build the application based on the build mode
RUN if [ "$BUILD_MODE" = "development" ]; then npm run build:dev; else npm run build; fi

# Stage 2: Serve the React application from Nginx server
FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy the build folder from stage 1 to Nginx's serve folder
COPY --from=build /app/build /usr/share/nginx/html

# Define the port number the container should expose
EXPOSE 80

# Run Nginx
CMD ["nginx", "-g", "daemon off;"]
