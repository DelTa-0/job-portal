FROM node:20-alpine

WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
COPY tsconfig.json ./
RUN npm install

# Copy source code
COPY . .

# Build TypeScript
RUN npm run build

# Copy entrypoint for migrations
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 3000

ENTRYPOINT ["/entrypoint.sh"]
CMD ["node", "dist/index.js"]
