# Step 1: Build stage
FROM node:16-alpine AS build-stage

WORKDIR /app

# Install dependencies
COPY package.json . 
RUN npm install --production

# Copy public and src directories
COPY ./public /app/public
COPY ./src /app/src

# Build the app
RUN npm run build

# Step 2: Final stage (runtime)
FROM nginx:alpine

# Copy built files to nginx
COPY --from=build-stage /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]

