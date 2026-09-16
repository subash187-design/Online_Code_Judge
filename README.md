# Algomind - Phase 1 Online Code Judge

A secure, isolated competitive programming judge system for evaluating C++ code submissions within a hardened containerized sandbox.

## System Components
- **`docker/cpp-runner/`**: Dockerfile running Alpine 3.19 + g++ with unprivileged user `judge_runner` (UID 1001), GNU timeout, and memory/output limits.
- **`server/`**: Node.js & Express REST API with PostgreSQL connection pool, seed scripts, output normalizer, and sandboxed execution service.
- **`client/`**: React 18, Vite, Tailwind CSS, Monaco Editor, two-pane problem solver, custom input testing, and live verdict badges.
- **`docker-compose.yml`**: Spawns PostgreSQL 15 and Redis 7 services.

---

## Quickstart Instructions

### 1. Prerequisites
- Docker Engine & Docker Compose (e.g. Docker Desktop running)
- Node.js (v18+ LTS)

### 2. Start PostgreSQL & Redis
```bash
docker compose up -d
```

### 3. Build the Judge Sandbox Image
```bash
docker build -t judge-runner:latest docker/cpp-runner
```

### 4. Setup Backend Server
```bash
cd server
npm install
npm run seed     # Initializes database tables and seeds sample problems
npm start        # Starts server on http://localhost:5000
```

### 5. Setup Frontend Client
```bash
cd client
npm install
npm run dev      # Starts Vite client on http://localhost:5173
```

Open [http://localhost:5173](http://localhost:5173) in your browser.
"# Online_Code_Judge" 
