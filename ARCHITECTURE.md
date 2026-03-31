# StockSenseAI Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER INTERFACE                          │
│                                                                 │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐      │
│  │Dashboard │  │ Products │  │  Sales   │  │  Alerts  │      │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘      │
│                                                                 │
│              React + Zustand + Vite                             │
│              http://localhost:5173                              │
└────────────────────────┬────────────────────────────────────────┘
                         │ REST API (JSON)
                         │
┌────────────────────────▼────────────────────────────────────────┐
│                      API GATEWAY                                │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Rate Limiter (100 req/15min)                            │  │
│  │  CORS Middleware                                         │  │
│  │  Compression                                             │  │
│  │  JWT Authentication                                      │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  Express.js + TypeScript                                        │
│  http://localhost:5000                                          │
└────────────────────────┬────────────────────────────────────────┘
                         │
         ┌───────────────┼───────────────┐
         │               │               │
         ▼               ▼               ▼
┌────────────┐  ┌────────────┐  ┌────────────┐
│   Auth     │  │  Business  │  │   Cache    │
│  Service   │  │   Logic    │  │  Service   │
│            │  │            │  │            │
│ - Register │  │ - Products │  │ - Redis    │
│ - Login    │  │ - Sales    │  │ - TTL      │
│ - JWT      │  │ - Alerts   │  │ - Invalidate│
└─────┬──────┘  └─────┬──────┘  └─────┬──────┘
      │               │               │
      └───────────────┼───────────────┘
                      │
         ┌────────────┼────────────┐
         │            │            │
         ▼            ▼            ▼
┌─────────────┐ ┌──────────┐ ┌──────────┐
│ PostgreSQL  │ │  Redis   │ │  Prisma  │
│             │ │          │ │   ORM    │
│ - Business  │ │ - Cache  │ │          │
│ - User      │ │ - Session│ │ - Models │
│ - Product   │ │ - Temp   │ │ - Queries│
│ - Sale      │ │          │ │ - Migrate│
│ - Alert     │ │          │ │          │
│ - Forecast  │ │          │ │          │
└─────────────┘ └──────────┘ └──────────┘
      │
      │
      ▼
┌─────────────────────────────────────────┐
│         BACKGROUND WORKERS              │
│                                         │
│  ┌────────────────────────────────┐    │
│  │  Cron Jobs (node-cron)         │    │
│  │                                │    │
│  │  • Hourly: Low Stock Check     │    │
│  │  • Daily: Forecast Generation  │    │
│  │  • Weekly: Slow-Moving Check   │    │
│  └────────────────────────────────┘    │
│                                         │
│  Node.js Worker Process                 │
└────────────┬────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────┐
│       ML FORECASTING SERVICE            │
│                                         │
│  ┌────────────────────────────────┐    │
│  │  Endpoints:                    │    │
│  │  • POST /forecast              │    │
│  │  • GET /health                 │    │
│  │                                │    │
│  │  Algorithm:                    │    │
│  │  • Moving Average              │    │
│  │  • Confidence Scoring          │    │
│  │  • 7-day Prediction            │    │
│  └────────────────────────────────┘    │
│                                         │
│  Python + FastAPI + NumPy               │
│  http://localhost:8000                  │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│          MASTRA AI LAYER                │
│                                         │
│  ┌────────────────────────────────┐    │
│  │  Inventory Analyst Agent       │    │
│  │                                │    │
│  │  Tools:                        │    │
│  │  • getInventoryStatus          │    │
│  │  • analyzeSlowMoving           │    │
│  │  • getRestockRecommendations   │    │
│  │                                │    │
│  │  Model: OpenAI GPT-4           │    │
│  └────────────────────────────────┘    │
│                                         │
│  Mastra Framework                       │
│  http://localhost:4111                  │
└─────────────────────────────────────────┘
```

## Data Flow Diagrams

### 1. User Registration Flow
```
┌──────┐     ┌─────────┐     ┌──────────┐     ┌──────────┐
│ User │────▶│Frontend │────▶│   API    │────▶│ Database │
└──────┘     └─────────┘     └──────────┘     └──────────┘
                                   │
                                   ▼
                            ┌──────────────┐
                            │ Create:      │
                            │ - Business   │
                            │ - User (Owner)│
                            └──────────────┘
                                   │
                                   ▼
                            ┌──────────────┐
                            │ Generate JWT │
                            └──────────────┘
                                   │
                                   ▼
┌──────┐     ┌─────────┐     ┌──────────┐
│ User │◀────│Frontend │◀────│   API    │
└──────┘     └─────────┘     └──────────┘
              (Store Token)
```

### 2. Product Creation Flow
```
┌──────┐     ┌─────────┐     ┌──────────┐     ┌──────────┐
│ User │────▶│Frontend │────▶│   API    │────▶│ Database │
└──────┘     └─────────┘     │(Auth MW) │     └──────────┘
                              └──────────┘
                                   │
                                   ▼
                            ┌──────────────┐
                            │ Validate JWT │
                            │ Check Role   │
                            └──────────────┘
                                   │
                                   ▼
                            ┌──────────────┐
                            │ Create       │
                            │ Product      │
                            └──────────────┘
                                   │
                                   ▼
                            ┌──────────────┐
                            │ Invalidate   │
                            │ Redis Cache  │
                            └──────────────┘
```

### 3. Sale Recording Flow
```
┌──────┐     ┌─────────┐     ┌──────────┐
│ User │────▶│Frontend │────▶│   API    │
└──────┘     └─────────┘     └──────────┘
                                   │
                                   ▼
                            ┌──────────────┐
                            │ Transaction: │
                            │              │
                            │ 1. Create    │
                            │    Sale      │
                            │              │
                            │ 2. Update    │
                            │    Stock     │
                            │              │
                            │ 3. Create    │
                            │    Inv Log   │
                            └──────────────┘
                                   │
                                   ▼
                            ┌──────────────┐
                            │  Database    │
                            │ (Atomic)     │
                            └──────────────┘
```

### 4. Alert Generation Flow
```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│ Cron Worker  │────▶│  Database    │────▶│ Check Rules  │
│ (Hourly)     │     │ (Query)      │     │              │
└──────────────┘     └──────────────┘     └──────────────┘
                                                  │
                                                  ▼
                                           ┌──────────────┐
                                           │ Low Stock?   │
                                           │ Slow Moving? │
                                           └──────────────┘
                                                  │
                                                  ▼
                                           ┌──────────────┐
                                           │ Create Alert │
                                           └──────────────┘
                                                  │
                                                  ▼
                                           ┌──────────────┐
                                           │  Database    │
                                           └──────────────┘
                                                  │
                                                  ▼
                                           ┌──────────────┐
                                           │ Invalidate   │
                                           │ Cache        │
                                           └──────────────┘
```

### 5. Forecast Generation Flow
```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│ Cron Worker  │────▶│  Database    │────▶│ Sales History│
│ (Daily 2AM)  │     │              │     │              │
└──────────────┘     └──────────────┘     └──────────────┘
                                                  │
                                                  ▼
                                           ┌──────────────┐
                                           │ ML Service   │
                                           │ POST /forecast│
                                           └──────────────┘
                                                  │
                                                  ▼
                                           ┌──────────────┐
                                           │ Calculate:   │
                                           │ - Avg Demand │
                                           │ - Confidence │
                                           │ - 7-day Pred │
                                           └──────────────┘
                                                  │
                                                  ▼
                                           ┌──────────────┐
                                           │ Store        │
                                           │ Forecasts    │
                                           └──────────────┘
```

## Component Responsibilities

### Frontend (React)
- User interface rendering
- State management (Zustand)
- API communication
- Token storage
- Form validation
- Route management

### Backend API (Express)
- Request routing
- Authentication/Authorization
- Business logic
- Data validation
- Cache management
- Error handling
- Response formatting

### Database (PostgreSQL)
- Data persistence
- Relationships
- Constraints
- Indexes
- Transactions
- Data integrity

### Cache (Redis)
- Temporary data storage
- Session management
- Performance optimization
- TTL management

### Worker (Node.js)
- Scheduled tasks
- Background processing
- Alert generation
- Forecast triggering
- Data cleanup

### ML Service (Python)
- Demand forecasting
- Statistical analysis
- Prediction algorithms
- Confidence scoring

### AI Agent (Mastra)
- Natural language processing
- Inventory analysis
- Recommendations
- Business insights

## Security Architecture

```
┌─────────────────────────────────────────┐
│          Security Layers                │
│                                         │
│  1. Rate Limiting                       │
│     └─ 100 requests / 15 minutes        │
│                                         │
│  2. CORS Protection                     │
│     └─ Allowed origins only             │
│                                         │
│  3. JWT Authentication                  │
│     └─ Token validation                 │
│                                         │
│  4. Role-Based Authorization            │
│     └─ Owner > Manager > Staff          │
│                                         │
│  5. Business Isolation                  │
│     └─ Data filtered by businessId      │
│                                         │
│  6. Input Validation                    │
│     └─ Zod schemas                      │
│                                         │
│  7. Password Hashing                    │
│     └─ bcrypt (10 rounds)               │
│                                         │
│  8. SQL Injection Prevention            │
│     └─ Prisma parameterized queries     │
└─────────────────────────────────────────┘
```

## Caching Strategy

```
┌─────────────────────────────────────────┐
│          Cache Hierarchy                │
│                                         │
│  Products Cache                         │
│  └─ TTL: 5 minutes                      │
│  └─ Key: products:{businessId}          │
│  └─ Invalidate: On CRUD                 │
│                                         │
│  Alerts Cache                           │
│  └─ TTL: 1 minute                       │
│  └─ Key: alerts:{businessId}            │
│  └─ Invalidate: On create/update        │
│                                         │
│  Dashboard Cache                        │
│  └─ TTL: 2 minutes                      │
│  └─ Key: dashboard:{businessId}         │
│  └─ Invalidate: On data change          │
└─────────────────────────────────────────┘
```

## Scalability Considerations

### Horizontal Scaling
- Stateless API design
- Redis for shared state
- Load balancer ready
- Database connection pooling

### Vertical Scaling
- Efficient queries
- Proper indexing
- Caching strategy
- Background processing

### Future Improvements
- Message queue (RabbitMQ)
- Microservices architecture
- Read replicas
- CDN integration
- Kubernetes orchestration

## Technology Choices

### Why Express?
- Mature ecosystem
- Middleware support
- TypeScript compatible
- Easy to scale

### Why Prisma?
- Type-safe queries
- Auto-generated types
- Migration management
- Multi-database support

### Why Redis?
- Fast in-memory storage
- TTL support
- Pub/sub capabilities
- Session management

### Why FastAPI?
- Fast performance
- Auto documentation
- Type hints
- Async support

### Why Mastra?
- AI agent framework
- Tool integration
- Observability
- OpenAI integration

### Why React?
- Component-based
- Large ecosystem
- Vite for speed
- TypeScript support

---

This architecture is designed for:
- ✅ Scalability
- ✅ Maintainability
- ✅ Security
- ✅ Performance
- ✅ Developer experience
