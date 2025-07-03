FROM node:18-alpine

WORKDIR /app

# 1. Copy package files first for layer caching
COPY package*.json ./

# 2. Install ALL dependencies (including Pinia)
RUN npm install -g vite && \
    npm install && \
    npm install pinia @vitejs/plugin-vue vue vue-router

# 3. Copy source code (with .dockerignore to exclude node_modules)
COPY . .

# 4. Build step (if needed)
# RUN npm run build

EXPOSE 5173

# 5. Use direct Vite execution for better HMR
CMD ["vite", "--host", "0.0.0.0"]