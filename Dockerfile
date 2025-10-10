# Use the official Node.js 18 image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Enable Corepack and activate pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Install dependencies (lockfile must be committed)
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Copy public directory explicitly
COPY public ./public

# Build the application
RUN pnpm build

# Expose port
EXPOSE 3000

# Start the application
CMD ["pnpm", "start"]