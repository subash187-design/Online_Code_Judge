# 🚀 Algomind Online Code Judge - Deployment Guide (Cloud VPS)

This guide walks you through deploying the **Algomind Online Code Judge** onto an Ubuntu Cloud VPS (AWS EC2, DigitalOcean, Hetzner, Linode, or any Linux server) with isolated Docker execution for submissions.

---

## 📋 Recommended Server Specifications

- **OS**: Ubuntu 22.04 LTS or Ubuntu 24.04 LTS
- **RAM**: Minimum 2 GB (4 GB recommended for compiling C++ and running Java JVMs simultaneously)
- **vCPU**: 2 cores recommended
- **Disk**: 25 GB+ SSD
- **Inbound Firewall Ports**:
  - `22` (SSH)
  - `80` (HTTP)
  - `443` (HTTPS)
  - `5000` (Optional direct Node.js testing before setting up Nginx)

---

## ⚡ Option 1: Quick Automated Deployment (Recommended)

Connect to your VPS via SSH and run:

```bash
# 1. Clone your repository
git clone https://github.com/subash187-design/Online_Code_Judge.git
cd Online_Code_Judge

# 2. Grant execution permission and run the setup script
chmod +x scripts/setup-vps.sh
./scripts/setup-vps.sh
```

The script will automatically:
1. Install Docker Engine & Node.js 20.
2. Build the `judge-runner:latest` container sandbox.
3. Start the PostgreSQL database via Docker.
4. Install npm packages and build the React frontend.
5. Run migrations & seed all 114 problems.
6. Launch the application under PM2 with auto-restart on system reboot.

---

## 🛠️ Option 2: Step-by-Step Manual Deployment

If you prefer to configure each component manually:

### Step 1: Update System & Install Docker

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl wget git build-essential ufw

# Install Docker
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER
# (Log out and log back in for docker group to take effect)
```

### Step 2: Install Node.js 20 LTS & PM2

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g pm2
```

### Step 3: Clone Code & Build the Judge Sandbox

```bash
git clone https://github.com/subash187-design/Online_Code_Judge.git
cd Online_Code_Judge

# Build the secure judge runner image for C/C++/Java/Python
docker build -t judge-runner:latest docker/cpp-runner
```

### Step 4: Start PostgreSQL

```bash
docker compose up -d postgres
```

### Step 5: Configure Backend Environment

```bash
cd server
cp .env.example .env
nano .env
```

Ensure `.env` contains your production settings:
```env
PORT=5000
DATABASE_URL=postgresql://postgres:password@localhost:5432/judge_db
JWT_SECRET=use_a_long_random_alphanumeric_secret
JWT_EXPIRES_IN=7d
EMAIL_VERIFICATION_TTL_MINUTES=15

# SMTP Email Configuration (Optional, for email verification & password reset)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
SMTP_FROM="Algomind Online Code Judge" <your_email@gmail.com>
```

### Step 6: Install Dependencies, Build Frontend & Seed Database

```bash
# Build React frontend
cd ../client
npm ci
npm run build

# Install server packages and seed database
cd ../server
npm ci
npm run seed
```

### Step 7: Launch Server with PM2

```bash
pm2 start src/index.js --name algomind
pm2 save
pm2 startup
```

---

## 🔒 Option 3: Setting Up Nginx Reverse Proxy & SSL (HTTPS)

To serve the application on your custom domain with free SSL certificates:

### 1. Install Nginx & Certbot

```bash
sudo apt install -y nginx certbot python3-certbot-nginx
```

### 2. Configure Nginx

```bash
sudo cp nginx/algomind.conf /etc/nginx/sites-available/algomind.conf
sudo nano /etc/nginx/sites-available/algomind.conf
```
*Replace `yourdomain.com` with your real domain name.*

Enable the configuration:
```bash
sudo ln -s /etc/nginx/sites-available/algomind.conf /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 3. Generate Free SSL Certificate

```bash
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```
Certbot will automatically install the SSL certificates and configure HTTPS redirects.

---

## 🔄 Useful Operations & Maintenance

| Command | Action |
| :--- | :--- |
| `pm2 status` | Check server process status |
| `pm2 logs algomind` | View live application logs |
| `pm2 restart algomind` | Restart the backend server |
| `docker ps` | View running containers (PostgreSQL, judge-runner) |
| `docker compose restart postgres` | Restart PostgreSQL container |

### Updating Your Code in the Future

```bash
git pull origin main
cd client && npm run build && cd ..
cd server && pm2 restart algomind && cd ..
```
