# Use a lightweight Node.js image
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /app

# Install dependencies first (to leverage Docker cache)
COPY package*.json ./
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the Nuxt dev server port (3000)
EXPOSE 3000

# Default command for dev mode
CMD ["npm", "run", "dev"]