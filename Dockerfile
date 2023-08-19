# Stage 1: Build the Angular app
FROM node:18 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install -g @angular/cli
RUN npm install ajv-formats
COPY . .
RUN ng build

# Stage 2: Serve the Angular app using NGINX
FROM nginx:alpine
COPY --from=build /app/dist/your-angular-app /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
