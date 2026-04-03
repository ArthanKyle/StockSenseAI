#!/bin/bash

echo "🚀 Starting StockSenseAI Development Environment"
echo ""

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

# Start databases
echo "📦 Starting PostgreSQL and Redis..."
docker compose up -d

# Wait for databases to be ready
echo "⏳ Waiting for databases to be ready..."
sleep 5

# Check if API dependencies are installed
if [ ! -d "apps/api/node_modules" ]; then
    echo "📥 Installing API dependencies..."
    cd apps/api && npm install && cd ../..
fi

# Check if Prisma is set up
if [ ! -d "apps/api/node_modules/.prisma" ]; then
    echo "🔧 Setting up Prisma..."
    cd apps/api && npx prisma generate && npx prisma migrate dev --name init && cd ../..
fi

# Check if frontend dependencies are installed
if [ ! -d "apps/dashboard/node_modules" ]; then
    echo "📥 Installing frontend dependencies..."
    cd apps/dashboard && npm install && cd ../..
fi

# Check if ML service dependencies are installed
if ! python3 -c "import fastapi" 2>/dev/null; then
    echo "📥 Installing ML service dependencies..."
    cd apps/ml-service && pip install -r requirements.txt && cd ../..
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "🎯 Next steps:"
echo "   Open 4 terminal windows and run:"
echo ""
echo "   Terminal 1: cd apps/api && npm run dev"
echo "   Terminal 2: cd apps/ml-service && uvicorn main:app --reload --port 8000"
echo "   Terminal 3: cd apps/dashboard && npm run dev"
echo "   Terminal 4: cd apps/api && npm run worker"
echo ""
echo "🌐 URLs:"
echo "   Frontend:  http://localhost:5173"
echo "   API:       http://localhost:5000"
echo "   ML:        http://localhost:8000"
echo ""
