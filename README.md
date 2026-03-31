# 🚀 StockSenseAI
AI-Powered Inventory Intelligence Platform

## 🧠 Overview
StockSenseAI is a multi-tenant AI-driven inventory management system designed for small to medium businesses (SMEs).
It goes beyond traditional inventory systems by integrating:

- 📊 Data analytics
- 🤖 AI decision-making (Mastra agents)
- 🔮 Demand forecasting
- ⚡ Real-time alerts
- 🌐 External market awareness (web scraping)

## 🎯 Problem Statement
Small businesses often suffer from:
- Overstock → wasted capital
- Stockouts → lost sales
- Poor demand forecasting
- Lack of actionable insights

## 💡 Solution
StockSenseAI provides:
- AI-powered demand prediction
- Intelligent restock recommendations
- Slow-moving product detection
- Real-time alerts
- Natural language business insights via AI agents

## 🏗️ System Architecture
```
Frontend (React + Zustand)
         ↓
Backend API (Express + Prisma)
         ↓
PostgreSQL (Primary Database)
         ↓
Mastra AI Layer
         ↓
OpenAI (LLM)
         ↓
Redis (Caching)
         ↓
ML Service (Python/FastAPI)
```

## 🧩 Tech Stack

### Frontend
- React (Vite)
- Zustand (state management)
- Recharts (analytics)
- Lucide React (icons)

### Backend
- Node.js + Express
- Prisma ORM
- PostgreSQL
- Redis

### AI Layer
- Mastra (Agents, Workflows, Tools)
- OpenAI API

### ML Service
- Python + FastAPI
- NumPy (forecasting)

### Infrastructure
- Docker + Docker Compose
- node-cron (workers)

## 🔑 Core Features

### 🏢 Multi-Tenant System
- Business-level data isolation
- Role-based access (Owner, Manager, Staff)

### 📦 Inventory Management
- Product CRUD
- Stock tracking
- Inventory logs
- Low-stock thresholds

### 💰 Sales Tracking
- Record transactions
- Revenue tracking
- Sales analytics

### 🧠 AI Decision Engine (Mastra)
- Inventory Analyst Agent
- Restock recommendations
- Slow-moving detection explanation
- Business Q&A

### 🔮 Forecasting
- 7-day demand prediction
- Average daily sales
- Risk scoring

### 🚨 Alerts System
- Low stock alerts
- Slow-moving alerts
- Demand spike alerts

### ⚡ Redis Caching
- Dashboard caching
- Product caching
- Alerts caching
- AI response optimization

## 📁 Project Structure
```
StockSenseAI/
├── apps/
│   ├── api/          # Express backend (TypeScript)
│   │   ├── prisma/   # Database schema
│   │   └── src/      # API routes, middleware, workers
│   ├── dashboard/    # React frontend (Vite + TypeScript)
│   │   └── src/      # Components, pages, store
│   └── ml-service/   # Python forecasting service (FastAPI)
├── src/mastra/       # Mastra AI agents & tools
│   └── agents/       # Inventory analyst agent
├── docker-compose.yml
├── SETUP.md          # Detailed setup instructions
└── README.md
```

## ⚙️ Quick Start

See [SETUP.md](./SETUP.md) for detailed instructions.

```bash
# 1. Start databases
docker compose up -d

# 2. Setup API
cd apps/api
npm install
npx prisma generate
npx prisma migrate dev --name init

# 3. Setup ML service
cd ../ml-service
pip install -r requirements.txt

# 4. Setup frontend
cd ../dashboard
npm install

# 5. Run everything (4 terminals needed)
# Terminal 1: cd apps/api && npm run dev
# Terminal 2: cd apps/ml-service && uvicorn main:app --reload --port 8000
# Terminal 3: cd apps/dashboard && npm run dev
# Terminal 4: cd apps/api && npm run worker
```

## 🌐 System URLs
- Frontend: http://localhost:5173
- API: http://localhost:5000
- Mastra: http://localhost:4111
- ML Service: http://localhost:8000
- Prisma Studio: http://localhost:5555

## 🤖 AI Agent Design

### Inventory Analyst Agent
Capabilities:
- Analyze stock levels
- Explain alerts
- Recommend restocking
- Answer business questions

## 🧠 Data Flow
```
User Action → API → PostgreSQL
                     ↓
                 Worker
                     ↓
                ML Service
                     ↓
            Predictions + Insights
                     ↓
                Mastra Agent
                     ↓
                 User UI
```

## � Security
- JWT Authentication
- Role-based authorization
- Business-level data isolation
- API protection via middleware

## 🚀 Future Enhancements
- Multi-branch inventory
- Supplier integrations
- Auto purchase orders
- Real-time WebSocket updates
- Advanced ML (Prophet/LSTM)
- Mobile app (React Native / Flutter)
- Web scraping for competitor pricing
- Supplier monitoring

## 🧠 Vision
StockSenseAI aims to become:
**"The AI brain for small business inventory decisions"**

## 👨‍💻 Author
**Arthan Kyle Ydeo**  
Software Developer | System Architect

## 📜 License
MIT License

---

Built with ❤️ using Mastra, React, Express, and AI
