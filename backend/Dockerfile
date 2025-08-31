FROM node:18-alpine
WORKDIR /app

# Copy package.json first (better caching)
COPY package.json ./

# Install dependencies
RUN npm install --omit=dev

# Copy the rest of backend files
COPY . .

EXPOSE 5000
CMD ["node", "server.js"]
