# Stage dev
FROM node:alpine as dev

# set working directory
WORKDIR /usr/src/app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

ENV REACT_APP_BACKEND_URL localhost:8000
ENV REACT_APP_DEV_MODE true

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install 
RUN npm install react-scripts@3.4.1 -g 

# add app
COPY . ./

EXPOSE 80

# start app
CMD ["npm", "start"]


# production stages:

# Stage 1: Install dependencies and build the React application
FROM node:alpine as build

WORKDIR /app

ENV PATH /usr/src/app/node_modules/.bin:$PATH

ENV REACT_APP_BACKEND_URL learn-react-app.de:8000
ENV REACT_APP_DEV_MODE false

# Copy package.json and package-lock.json/yarn.lock
COPY package*.json ./

# Install all dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
#RUN npm run build
CMD [ "npm", "run", "build" ]




# # Stage 2: Serve the React application from Nginx server
# FROM nginx:alpine as prod

# COPY nginx.conf /etc/nginx/conf.d/default.conf

# # Remove default nginx website
# RUN rm -rf /usr/share/nginx/html/*

# # Copy the build folder from stage 1 to Nginx's serve folder
# COPY --from=build /app/build /usr/share/nginx/html

# # Define the port number the container should expose
# EXPOSE 80

# # Run Nginx
# CMD ["nginx", "-g", "daemon off;"]
