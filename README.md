# 🚀 StockSenseAI

**AI-Powered Inventory Intelligence Platform**

---

## 🧠 Overview

StockSenseAI is a **multi-tenant AI-driven inventory management system** designed for small to medium businesses (SMEs).

It goes beyond traditional inventory systems by integrating:

* 📊 Data analytics
* 🤖 AI decision-making (Mastra agents)
* 🔮 Demand forecasting
* ⚡ Real-time alerts
* 🌐 External market awareness (web scraping)

---

## 🎯 Problem Statement

Small businesses often suffer from:

* Overstock → wasted capital
* Stockouts → lost sales
* Poor demand forecasting
* Lack of actionable insights

---

## 💡 Solution

StockSenseAI provides:

* AI-powered demand prediction
* Intelligent restock recommendations
* Slow-moving product detection
* Real-time alerts
* Natural language business insights via AI agents

---

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
Scraper Workers (Playwright/Cheerio)
```

---

## 🧩 Tech Stack

### Frontend

* React (Vite)
* Zustand (state management)
* Recharts (analytics)

### Backend

* Node.js + Express
* Prisma ORM

### AI Layer

* Mastra (Agents, Workflows, Tools)
* OpenAI API

### Database

* PostgreSQL (Dockerized)

### Caching / Queue

* Redis

### Scraping

* Playwright
* Cheerio
* Axios

### Workers

* node-cron

---

## 🔑 Core Features

### 🏢 Multi-Tenant System

* Business-level data isolation
* Role-based access (Owner, Manager, Staff)

---

### 📦 Inventory Management

* Product CRUD
* Stock tracking
* Inventory logs
* Low-stock thresholds

---

### 💰 Sales Tracking

* Record transactions
* Revenue tracking
* Sales analytics

---

### 🧠 AI Decision Engine (Mastra)

* Inventory Analyst Agent
* Restock recommendation
* Slow-moving detection explanation
* Business Q&A

---

### 🔮 Forecasting

* 7-day demand prediction
* Average daily sales
* Risk scoring

---

### 🚨 Alerts System

* Low stock alerts
* Slow-moving alerts
* Demand spike alerts

---

### 🌐 Web Scraping (External Intelligence)

* Competitor price tracking
* Supplier monitoring
* Market trend signals

---

### ⚡ Redis Caching

* Dashboard caching
* Product caching
* Alerts caching
* AI response optimization

---

## 📁 Project Structure

```
StockSenseAI/
├── apps/
│   ├── api/          # Express backend
│   ├── dashboard/    # React frontend
│   ├── mastra/       # AI agents & workflows
│   ├── scraper/      # scraping jobs
│   └── ml-service/   # forecasting service
├── docker-compose.yml
├── README.md
└── package.json
```

---

## 🐳 Docker Setup

### Start Database

```bash
docker compose up -d
```

---

### PostgreSQL Config

```
Host: localhost
Port: 5432
User: postgres
Password: postgres
Database: inventory
```

---

## ⚙️ Local Development Setup

### 1. Install dependencies

```bash
npm install
```

---

### 2. Setup backend

```bash
cd apps/api
npm install
npx prisma generate
npx prisma migrate dev --name init
```

---

### 3. Start ML service

```bash
cd apps/ml-service
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

---

### 4. Start API

```bash
cd apps/api
npm run dev
```

---

### 5. Start Mastra

```bash
cd apps/mastra
npm install
npm run dev
```

---

### 6. Start frontend

```bash
cd apps/dashboard
npm install
npm run dev
```

---

### 7. Start worker

```bash
cd apps/api
npm run worker
```

---

## 🌐 System URLs

```
Frontend: http://localhost:5173
API: http://localhost:5000
Mastra: http://localhost:4111
ML Service: http://localhost:8000
Prisma Studio: http://localhost:5555
```

---

## 🤖 AI Agent Design

### Inventory Analyst Agent

Capabilities:

* Analyze stock levels
* Explain alerts
* Recommend restocking
* Answer business questions

---

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

---

## 🔐 Security

* JWT Authentication
* Role-based authorization
* Business-level data isolation
* API protection via middleware

---

## 🚀 Future Enhancements

* Multi-branch inventory
* Supplier integration
* Auto purchase orders
* Real-time WebSocket updates
* Advanced ML (Prophet/LSTM)
* Mobile app (React Native / Flutter)

---

## 🧠 Vision

StockSenseAI aims to become:

> **“The AI brain for small business inventory decisions”**

---

## 👨‍💻 Author

**Arthan Kyle Ydeo**
Software Developer | System Architect

---

## 📜 License

MIT License
