FROM node:18-alpine

WORKDIR /app

# Install Vite globally
RUN npm install -g vite

# Copy only package files for caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Expose dev server port
EXPOSE 5173

# Run Vite dev server
CMD ["vite", "--host", "0.0.0.0"]
