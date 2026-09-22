# Base Image
FROM mcr.microsoft.com/playwright:v1.63.0-noble

# Set the working directory
WORKDIR /playwright-test

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copying files
COPY . .

# Run tests
CMD ["npx", "playwright", "test", "--project=e2e"]
