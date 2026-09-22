# ==============================================================================
# Dockerfile for Bursa Gold Price Automated Collector Service
# ==============================================================================

FROM node:22-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source files
COPY collector/ collector/
COPY tsconfig.json ./

# Production runner image
FROM node:22-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --omit=dev && npm install -g tsx

COPY --from=builder /app/collector ./collector
COPY --from=builder /app/tsconfig.json ./

EXPOSE 4000

# Health check against the /health endpoint
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:4000/health || exit 1

CMD ["tsx", "collector/src/index.ts"]
