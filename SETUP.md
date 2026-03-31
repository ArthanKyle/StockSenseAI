# StockSenseAI Setup Guide

## Prerequisites

- Node.js >= 22.13.0
- Python >= 3.9
- Docker & Docker Compose
- Git

## Quick Start

### 1. Start Database Services

```bash
docker compose up -d
```

This starts PostgreSQL and Redis containers.

### 2. Setup Backend API

```bash
cd apps/api
npm install
npx prisma generate
npx prisma migrate dev --name init
```

### 3. Setup ML Service

```bash
cd apps/ml-service
pip install -r requirements.txt
```

### 4. Setup Frontend

```bash
cd apps/dashboard
npm install
```

### 5. Setup Mastra (AI Layer)

The Mastra configuration is already in the root `src/mastra` directory.

```bash
# From root directory
npm install
```

## Running the Application

Open 4 terminal windows:

### Terminal 1: Backend API
```bash
cd apps/api
npm run dev
```
Runs on http://localhost:5000

### Terminal 2: ML Service
```bash
cd apps/ml-service
uvicorn main:app --reload --port 8000
```
Runs on http://localhost:8000

### Terminal 3: Frontend
```bash
cd apps/dashboard
npm run dev
```
Runs on http://localhost:5173

### Terminal 4: Worker (Background Jobs)
```bash
cd apps/api
npm run worker
```

### Terminal 5 (Optional): Mastra Dev Server
```bash
# From root directory
npm run dev
```
Runs on http://localhost:4111

## Environment Variables

### apps/api/.env
```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/inventory"
REDIS_URL="redis://localhost:6379"
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
PORT=5000
NODE_ENV=development
MASTRA_API_URL="http://localhost:4111"
ML_SERVICE_URL="http://localhost:8000"
```

### Root .env (for Mastra)
```
OPENAI_API_KEY=your-openai-api-key
```

## Database Management

### View Database
```bash
cd apps/api
npx prisma studio
```
Opens Prisma Studio on http://localhost:5555

### Reset Database
```bash
cd apps/api
npx prisma migrate reset
```

### Create New Migration
```bash
cd apps/api
npx prisma migrate dev --name your_migration_name
```

## Testing the System

1. Open http://localhost:5173
2. Register a new business account
3. Add some products
4. Record sales
5. Check alerts and forecasts

## Architecture Overview

```
Frontend (React)
    ↓
Backend API (Express)
    ↓
PostgreSQL ← Prisma ORM
    ↓
Redis (Caching)
    ↓
Mastra AI (Agents)
    ↓
ML Service (Python/FastAPI)
```

## Troubleshooting

### Port Already in Use
```bash
# Find process using port
lsof -i :5000
# Kill process
kill -9 <PID>
```

### Database Connection Issues
```bash
# Check if PostgreSQL is running
docker ps
# Restart containers
docker compose restart
```

### Redis Connection Issues
```bash
# Check Redis
docker exec -it stocksense-redis redis-cli ping
# Should return PONG
```

## Next Steps

1. Implement web scraping workers
2. Connect Mastra agent tools to API endpoints
3. Add more sophisticated ML models (Prophet, LSTM)
4. Implement real-time WebSocket updates
5. Add comprehensive testing
6. Deploy to production

## Production Deployment

For production:
1. Use managed PostgreSQL (AWS RDS, Supabase, etc.)
2. Use managed Redis (AWS ElastiCache, Upstash, etc.)
3. Set strong JWT_SECRET
4. Enable HTTPS
5. Set up proper monitoring and logging
6. Configure CORS properly
7. Use environment-specific configs
