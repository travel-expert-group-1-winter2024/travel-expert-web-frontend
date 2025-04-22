FROM node:20-alpine AS builder

WORKDIR /app

# Copy package.json and lock file
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the Vite app
RUN npm run build

# Stage 2: Serve the app with Nginx
FROM nginx:stable-alpine

# Clear default nginx static content
RUN rm -rf /usr/share/nginx/html/*

# Copy build output from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Optional: Add custom nginx config if needed
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]