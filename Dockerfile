# Stage 1: Install dependencies
FROM node:18-alpine AS deps

# Update packages to patch vulnerabilities
RUN apk update && apk upgrade

# Install pnpm
RUN npm install -g pnpm

WORKDIR /app

# Copy dependency definition files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Stage 2: Build the application
FROM node:18-alpine AS builder

# Update packages to patch vulnerabilities
RUN apk update && apk upgrade

# Install pnpm
RUN npm install -g pnpm

WORKDIR /app

# Copy dependencies from the 'deps' stage
COPY --from=deps /app/node_modules ./node_modules

# Copy the rest of the application files
COPY . .

# Build the Next.js application
RUN pnpm build

# Stage 3: Production image
FROM node:18-alpine AS runner

# Update packages to patch vulnerabilities
RUN apk update && apk upgrade

WORKDIR /app

# Set environment variables
ENV NODE_ENV=production

# Copy the built application from the 'builder' stage
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

# Expose the port the app runs on
EXPOSE 3000

# Start the Next.js application
CMD ["node_modules/.bin/next", "start"]
