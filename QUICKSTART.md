# 🚀 StockSenseAI Quick Start

## Prerequisites
- Node.js >= 22.13.0
- Python >= 3.9
- Docker Desktop running

## 5-Minute Setup

### 1. Clone and Navigate
```bash
cd StockSenseAI
```

### 2. Start Databases
```bash
docker compose up -d
```

### 3. Setup Backend
```bash
cd apps/api
npm install
npx prisma generate
npx prisma migrate dev --name init
cd ../..
```

### 4. Setup ML Service
```bash
cd apps/ml-service
pip install -r requirements.txt
cd ../..
```

### 5. Setup Frontend
```bash
cd apps/dashboard
npm install
cd ../..
```

## Running the App

Open 4 terminals:

### Terminal 1: API
```bash
cd apps/api
npm run dev
```
✅ API running on http://localhost:5000

### Terminal 2: ML Service
```bash
cd apps/ml-service
uvicorn main:app --reload --port 8000
```
✅ ML Service running on http://localhost:8000

### Terminal 3: Frontend
```bash
cd apps/dashboard
npm run dev
```
✅ Frontend running on http://localhost:5173

### Terminal 4: Worker
```bash
cd apps/api
npm run worker
```
✅ Background jobs running

## First Steps

1. Open http://localhost:5173
2. Click "Register"
3. Fill in:
   - Your Name
   - Business Name
   - Email
   - Password
4. Click "Register"
5. You're in! 🎉

## What to Try

### Add Your First Product
1. Go to "Products"
2. Click "Add Product"
3. Fill in product details
4. Save

### Record a Sale
1. Go to "Sales"
2. Click "Record Sale"
3. Select products and quantities
4. Submit

### Check Alerts
1. Go to "Alerts"
2. See low stock warnings
3. View slow-moving products

### View Dashboard
1. Go to "Dashboard"
2. See key metrics
3. View sales trends

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5000
npx kill-port 5000
```

### Database Connection Failed
```bash
# Restart Docker containers
docker compose restart
```

### Redis Connection Failed
```bash
# Check Redis is running
docker ps | grep redis
```

### Can't Access Frontend
- Check if Vite is running on port 5173
- Try http://127.0.0.1:5173 instead

## Next Steps

- Read [SETUP.md](./SETUP.md) for detailed setup
- Check [API.md](./API.md) for API documentation
- See [DEPLOYMENT.md](./DEPLOYMENT.md) for production deployment

## Need Help?

- Check logs in each terminal
- Ensure Docker is running
- Verify all ports are available
- Check environment variables

## Useful Commands

```bash
# View database
cd apps/api && npx prisma studio

# Reset database
cd apps/api && npx prisma migrate reset

# Check Docker containers
docker ps

# View Docker logs
docker logs stocksense-postgres
docker logs stocksense-redis

# Stop all services
docker compose down
```

Happy coding! 🚀
