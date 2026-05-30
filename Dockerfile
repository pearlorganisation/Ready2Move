FROM node:21-alpine

# Set working directory
WORKDIR /app

# Copy package files first (better caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the project (no .env — handled by volume)
COPY . .

# Build the Next.js app
RUN npm run build

# Expose port
EXPOSE 6001

# Start the app
CMD ["npm", "start"]
