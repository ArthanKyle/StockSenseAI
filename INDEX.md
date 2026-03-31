# 📚 StockSenseAI Documentation Index

Welcome to StockSenseAI! This index will help you navigate all the documentation.

## 🚀 Getting Started

Start here if you're new to the project:

1. **[README.md](./README.md)** - Project overview and features
2. **[QUICKSTART.md](./QUICKSTART.md)** - 5-minute setup guide
3. **[SETUP.md](./SETUP.md)** - Detailed installation instructions

## 📖 Core Documentation

### For Developers

- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - System architecture and design
- **[API.md](./API.md)** - Complete API reference
- **[PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)** - What's built and what's not

### For DevOps

- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Production deployment guide
- **[docker-compose.yml](./docker-compose.yml)** - Local infrastructure setup

### For Contributors

- **[CONTRIBUTING.md](./CONTRIBUTING.md)** - How to contribute
- **[CHANGELOG.md](./CHANGELOG.md)** - Version history

### For Troubleshooting

- **[TROUBLESHOOTING.md](./TROUBLESHOOTING.md)** - Common issues and solutions

## 🗂️ Project Structure

```
StockSenseAI/
├── 📄 Documentation
│   ├── README.md              # Project overview
│   ├── QUICKSTART.md          # Quick setup
│   ├── SETUP.md               # Detailed setup
│   ├── API.md                 # API docs
│   ├── ARCHITECTURE.md        # System design
│   ├── DEPLOYMENT.md          # Production guide
│   ├── CONTRIBUTING.md        # Contribution guide
│   ├── CHANGELOG.md           # Version history
│   ├── PROJECT_SUMMARY.md     # Project status
│   └── INDEX.md               # This file
│
├── 🚀 Scripts
│   ├── start-dev.sh           # Linux/Mac startup
│   └── start-dev.bat          # Windows startup
│
├── 🔧 Configuration
│   ├── docker-compose.yml     # Docker setup
│   ├── package.json           # Root dependencies
│   └── .gitignore             # Git ignore rules
│
├── 🖥️ Backend API
│   └── apps/api/
│       ├── prisma/            # Database schema
│       ├── src/
│       │   ├── routes/        # API endpoints
│       │   ├── middleware/    # Auth, etc.
│       │   ├── lib/           # Utilities
│       │   ├── index.ts       # Main server
│       │   └── worker.ts      # Background jobs
│       ├── package.json
│       ├── tsconfig.json
│       └── .env
│
├── 🎨 Frontend
│   └── apps/dashboard/
│       ├── src/
│       │   ├── pages/         # React pages
│       │   ├── components/    # React components
│       │   ├── store/         # Zustand store
│       │   ├── App.tsx
│       │   └── main.tsx
│       ├── package.json
│       ├── tsconfig.json
│       ├── vite.config.ts
│       └── index.html
│
├── 🤖 ML Service
│   └── apps/ml-service/
│       ├── main.py            # FastAPI app
│       └── requirements.txt
│
└── 🧠 AI Agent
    └── src/mastra/
        ├── agents/            # Mastra agents
        └── index.ts           # Mastra config
```

## 📋 Quick Reference

### Common Commands

```bash
# Start databases
docker compose up -d

# Setup API
cd apps/api
npm install
npx prisma generate
npx prisma migrate dev

# Run API
npm run dev

# Run Worker
npm run worker

# View Database
npx prisma studio

# Setup Frontend
cd apps/dashboard
npm install
npm run dev

# Setup ML Service
cd apps/ml-service
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

### URLs

| Service | URL | Description |
|---------|-----|-------------|
| Frontend | http://localhost:5173 | React dashboard |
| API | http://localhost:5000 | Express backend |
| ML Service | http://localhost:8000 | Python forecasting |
| Mastra | http://localhost:4111 | AI agent |
| Prisma Studio | http://localhost:5555 | Database viewer |
| PostgreSQL | localhost:5432 | Database |
| Redis | localhost:6379 | Cache |

### Environment Variables

**apps/api/.env**
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/inventory"
REDIS_URL="redis://localhost:6379"
JWT_SECRET="your-secret-key"
PORT=5000
MASTRA_API_URL="http://localhost:4111"
ML_SERVICE_URL="http://localhost:8000"
```

**Root .env**
```env
OPENAI_API_KEY="your-openai-key"
```

## 🎯 Use Cases

### I want to...

**...understand the project**
→ Read [README.md](./README.md) and [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)

**...set up locally**
→ Follow [QUICKSTART.md](./QUICKSTART.md) or [SETUP.md](./SETUP.md)

**...understand the architecture**
→ Read [ARCHITECTURE.md](./ARCHITECTURE.md)

**...use the API**
→ Check [API.md](./API.md)

**...deploy to production**
→ Follow [DEPLOYMENT.md](./DEPLOYMENT.md)

**...contribute**
→ Read [CONTRIBUTING.md](./CONTRIBUTING.md)

**...see what's built**
→ Check [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)

**...troubleshoot issues**
→ Check [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)

## 🔍 Feature Documentation

### Authentication
- JWT-based authentication
- Role-based access control (Owner, Manager, Staff)
- Password hashing with bcrypt
- See: [API.md](./API.md#authentication)

### Products
- CRUD operations
- Stock tracking
- Low stock thresholds
- See: [API.md](./API.md#products)

### Sales
- Transaction recording
- Automatic stock updates
- Inventory logging
- See: [API.md](./API.md#sales)

### Alerts
- Low stock alerts
- Slow-moving product detection
- Automated generation
- See: [API.md](./API.md#alerts)

### Forecasting
- 7-day demand prediction
- Moving average algorithm
- Confidence scoring
- See: [ARCHITECTURE.md](./ARCHITECTURE.md#ml-service)

### AI Agent
- Natural language queries
- Inventory analysis
- Recommendations
- See: [ARCHITECTURE.md](./ARCHITECTURE.md#ai-agent)

## 🛠️ Development Workflow

1. **Setup** → [QUICKSTART.md](./QUICKSTART.md)
2. **Develop** → Make changes
3. **Test** → Manual testing (automated tests TBD)
4. **Commit** → Follow [CONTRIBUTING.md](./CONTRIBUTING.md)
5. **Deploy** → Follow [DEPLOYMENT.md](./DEPLOYMENT.md)

## 📊 Tech Stack Reference

### Frontend
- React 19
- TypeScript 6
- Vite 6
- Zustand 5
- Lucide React

### Backend
- Node.js 22+
- Express 4
- TypeScript 6
- Prisma 6
- PostgreSQL 16
- Redis 7

### ML
- Python 3.9+
- FastAPI
- NumPy

### AI
- Mastra
- OpenAI GPT-4

### Infrastructure
- Docker
- Docker Compose

## 🆘 Getting Help

### Documentation Issues
- Check this index
- Search in relevant doc files
- Check troubleshooting sections

### Code Issues
- Check logs in terminals
- Verify environment variables
- Check Docker containers
- Review [SETUP.md](./SETUP.md)

### Feature Requests
- Read [CONTRIBUTING.md](./CONTRIBUTING.md)
- Open an issue
- Submit a PR

## 📝 Documentation Standards

All documentation follows:
- Clear headings
- Code examples
- Step-by-step instructions
- Troubleshooting sections
- Links to related docs

## 🔄 Keeping Updated

- Check [CHANGELOG.md](./CHANGELOG.md) for updates
- Pull latest changes regularly
- Review updated documentation
- Test new features

## 📞 Contact

**Author:** Arthan Kyle Ydeo  
**Project:** StockSenseAI  
**License:** MIT

---

**Last Updated:** 2024  
**Version:** 1.0.0  
**Status:** Development Ready

Happy coding! 🚀
