#!/bin/bash
# ==============================================================================
# Algomind Online Code Judge - Automated Ubuntu VPS Setup Script
# Tested on: Ubuntu 22.04 LTS / 24.04 LTS
# ==============================================================================

set -e

echo "=========================================================="
echo " Starting Algomind Code Judge Setup on Ubuntu VPS "
echo "=========================================================="

# 1. Update APT and install base dependencies
echo "[1/7] Updating system and installing base utilities..."
sudo apt update && sudo apt install -y curl wget git build-essential ca-certificates gnupg ufw

# 2. Install Docker & Docker Compose Plugin
if ! command -v docker &> /dev/null; then
    echo "[2/7] Installing Docker Engine..."
    sudo install -m 0755 -d /etc/apt/keyrings
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
    sudo chmod a+r /etc/apt/keyrings/docker.gpg
    echo "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
    sudo apt update
    sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
    sudo usermod -aG docker $USER
    echo "Docker installed successfully."
else
    echo "[2/7] Docker is already installed."
fi

# 3. Install Node.js 20 LTS & PM2
if ! command -v node &> /dev/null; then
    echo "[3/7] Installing Node.js 20 LTS..."
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt install -y nodejs
fi
sudo npm install -g pm2

# 4. Build Code Judge Sandbox Docker Image
echo "[4/7] Building judge-runner:latest Docker sandbox image..."
cd "$(dirname "$0")/.."
sudo docker build -t judge-runner:latest docker/cpp-runner

# 5. Start PostgreSQL Database via Docker Compose
echo "[5/7] Starting PostgreSQL container..."
sudo docker compose up -d postgres

# Wait for Postgres to be ready
echo "Waiting for database to accept connections..."
until sudo docker exec -i judge_postgres pg_isready -U postgres > /dev/null 2>&1; do
    sleep 2
done
echo "PostgreSQL is ready!"

# 6. Install Dependencies & Build Frontend
echo "[6/7] Installing Node dependencies and building React frontend..."
cd client
npm ci
npm run build
cd ..

cd server
npm ci

# Configure .env if not exists
if [ ! -f .env ]; then
    echo "Creating server/.env from template..."
    cp .env.example .env
    # Generate random JWT secret
    JWT_RAND=$(openssl rand -hex 32)
    sed -i "s/replace_with_a_long_random_secret_key_in_production/$JWT_RAND/" .env
fi

# Run Database Migrations and Seeders
echo "Running database migrations and seeders..."
npm run seed
cd ..

# 7. Start Application with PM2
echo "[7/7] Starting backend application with PM2..."
cd server
pm2 delete algomind 2>/dev/null || true
pm2 start src/index.js --name algomind
pm2 save
pm2 startup | tail -n 1 | sudo bash || true
cd ..

echo "=========================================================="
echo " Algomind Online Code Judge Deployed Successfully! "
echo "=========================================================="
echo "Status: Running on port 5000 (http://$(curl -s ifconfig.me):5000)"
echo "Use 'pm2 status' and 'pm2 logs algomind' to monitor the app."
