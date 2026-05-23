# ---- Stage 1: Install dependencies ----
FROM node:20-alpine AS deps

WORKDIR /app

# Copy package files and install production deps only
COPY package*.json ./
RUN npm install --omit=dev

# ---- Stage 2: Production image ----
FROM node:20-alpine AS runner

# Set working directory
WORKDIR /app

# Use non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy installed node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy application source
COPY index.js ./
COPY public/ ./public/

# Transfer ownership to non-root user
RUN chown -R appuser:appgroup /app

USER appuser

# Expose the port the app listens on
EXPOSE 3000

# Healthcheck
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost:3000 || exit 1

# Start the server
CMD ["node", "index.js"]
