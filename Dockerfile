# ==========================================
# Stage 1: Build Frontend (React + Vite)
# ==========================================
FROM node:20-alpine AS client-builder
WORKDIR /app/client

COPY client/package*.json ./
RUN npm ci

COPY client/ ./
RUN chmod -R +x node_modules/.bin || true
RUN npm run build

# ==========================================
# Stage 2: Production Server (Node.js + Docker CLI)
# ==========================================
FROM node:20-bookworm-slim AS production

# Install compilers for native code execution (Render/PaaS) and Docker CLI (VPS)
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    ca-certificates \
    gnupg \
    gcc \
    g++ \
    python3 \
    default-jdk-headless \
    build-essential \
    && install -m 0755 -d /etc/apt/keyrings \
    && curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg \
    && chmod a+r /etc/apt/keyrings/docker.gpg \
    && echo "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian bookworm stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null \
    && apt-get update && apt-get install -y --no-install-recommends \
    docker-ce-cli \
    && rm -rf /var/lib/apt/lists/*


WORKDIR /app

# Copy server dependency files and install production packages
COPY server/package*.json ./server/
WORKDIR /app/server
RUN npm ci --only=production

# Copy backend source
COPY server/ ./

# Copy built frontend assets from stage 1 into client/dist
COPY --from=client-builder /app/client/dist /app/client/dist

# Expose backend server port
EXPOSE 5000

ENV NODE_ENV=production
ENV PORT=5000

CMD ["node", "src/index.js"]
