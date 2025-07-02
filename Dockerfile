FROM node:18-alpine

WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install ALL dependencies (include devDependencies)
RUN npm install

# Copy source code
COPY . .

# Explicitly install vite globally
RUN npm install --save vue vue-router && npm install --save-dev @vitejs/plugin-vue


EXPOSE 5173

CMD ["npm", "run", "dev"]