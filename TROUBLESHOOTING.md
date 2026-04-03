# 🔧 StockSenseAI Troubleshooting Guide

Common issues and their solutions.

## 🐳 Docker Issues

### Docker is not running
```
Error: Cannot connect to the Docker daemon
```

**Solution:**
- Start Docker Desktop
- Wait for it to fully start
- Run `docker ps` to verify

### Port already in use
```
Error: port is already allocated
```

**Solution:**
```bash
# Find what's using the port
# Windows
netstat -ano | findstr :5432

# Linux/Mac
lsof -i :5432

# Kill the process or change port in docker-compose.yml
```

### Containers won't start
```
Error: container exited with code 1
```

**Solution:**
```bash
# Check logs
docker logs stocksense-postgres
docker logs stocksense-redis

# Restart containers
docker compose restart

# Nuclear option: remove and recreate
docker compose down -v
docker compose up -d
```

## 💾 Database Issues

### Cannot connect to database
```
Error: Can't reach database server
```

**Solution:**
1. Check Docker container is running:
   ```bash
   docker ps | grep postgres
   ```

2. Verify DATABASE_URL in `apps/api/.env`:
   ```
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/inventory"
   ```

3. Test connection:
   ```bash
   cd apps/api
   npx prisma db push
   ```

### Prisma migrations fail
```
Error: Migration failed
```

**Solution:**
```bash
cd apps/api

# Reset database (WARNING: deletes all data)
npx prisma migrate reset

# Or create new migration
npx prisma migrate dev --name fix_migration
```

### Tables don't exist
```
Error: relation "Product" does not exist
```

**Solution:**
```bash
cd apps/api
npx prisma generate
npx prisma migrate dev --name init
```

## 🔴 Redis Issues

### Cannot connect to Redis
```
Error: Redis connection refused
```

**Solution:**
1. Check Redis is running:
   ```bash
   docker ps | grep redis
   ```

2. Test connection:
   ```bash
   docker exec -it stocksense-redis redis-cli ping
   # Should return: PONG
   ```

3. Verify REDIS_URL in `apps/api/.env`:
   ```
   REDIS_URL="redis://localhost:6379"
   ```

### Redis commands fail
```
Error: WRONGTYPE Operation against a key
```

**Solution:**
```bash
# Clear Redis cache
docker exec -it stocksense-redis redis-cli FLUSHALL
```

## 🔌 API Issues

### Port 5000 already in use
```
Error: EADDRINUSE: address already in use :::5000
```

**Solution:**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Linux/Mac
lsof -i :5000
kill -9 <PID>

# Or change port in apps/api/.env
PORT=5001
```

### JWT errors
```
Error: Invalid token
```

**Solution:**
1. Check JWT_SECRET is set in `apps/api/.env`
2. Clear browser localStorage
3. Login again

### CORS errors
```
Error: CORS policy blocked
```

**Solution:**
In `apps/api/src/index.ts`, verify CORS is configured:
```typescript
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
```

### Rate limit errors
```
Error: Too many requests
```

**Solution:**
Wait 15 minutes or adjust rate limit in `apps/api/src/index.ts`:
```typescript
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000 // Increase this
});
```

## 🎨 Frontend Issues

### Port 5173 already in use
```
Error: Port 5173 is in use
```

**Solution:**
```bash
# Kill process
npx kill-port 5173

# Or change port in apps/dashboard/vite.config.ts
server: {
  port: 5174
}
```

### Cannot connect to API
```
Error: Network Error
```

**Solution:**
1. Verify API is running on port 5000
2. Check proxy in `apps/dashboard/vite.config.ts`:
   ```typescript
   proxy: {
     '/api': {
       target: 'http://localhost:5000',
       changeOrigin: true
     }
   }
   ```

### White screen / blank page
```
Nothing renders
```

**Solution:**
1. Check browser console for errors
2. Verify token in localStorage
3. Clear cache and reload
4. Check if API is responding

### Login doesn't work
```
Authentication fails
```

**Solution:**
1. Check API is running
2. Verify credentials
3. Check browser console
4. Clear localStorage and try again

## 🐍 ML Service Issues

### Python dependencies fail
```
Error: No module named 'fastapi'
```

**Solution:**
```bash
cd apps/ml-service

# Create virtual environment
python -m venv venv

# Activate it
# Windows
venv\Scripts\activate
# Linux/Mac
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### Port 8000 already in use
```
Error: Address already in use
```

**Solution:**
```bash
# Find and kill process
# Windows
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# Linux/Mac
lsof -i :8000
kill -9 <PID>

# Or change port
uvicorn main:app --reload --port 8001
```

### ML service crashes
```
Error: Application startup failed
```

**Solution:**
1. Check Python version (>= 3.9)
2. Verify all dependencies installed
3. Check logs for specific error
4. Restart service

## 🤖 Mastra Issues

### OpenAI API key missing
```
Error: OpenAI API key not found
```

**Solution:**
Add to root `.env`:
```
OPENAI_API_KEY=sk-your-key-here
```

### Mastra won't start
```
Error: Cannot start Mastra
```

**Solution:**
```bash
# From root directory
npm install
npm run dev
```

### Agent doesn't respond
```
AI agent not working
```

**Solution:**
1. Verify OpenAI API key is valid
2. Check you have API credits
3. Review Mastra logs
4. Test with simple query

## 🔄 Worker Issues

### Worker not running
```
Alerts not generating
```

**Solution:**
```bash
cd apps/api
npm run worker

# Check logs for errors
```

### Cron jobs not firing
```
Scheduled tasks not running
```

**Solution:**
1. Verify worker is running
2. Check system time is correct
3. Review cron schedule syntax
4. Check worker logs

## 📦 npm/Node Issues

### npm install fails
```
Error: EACCES permission denied
```

**Solution:**
```bash
# Don't use sudo! Fix npm permissions
# Or use nvm (Node Version Manager)

# Windows: Run as Administrator
# Linux/Mac: Fix npm permissions
npm config set prefix ~/.npm-global
export PATH=~/.npm-global/bin:$PATH
```

### Wrong Node version
```
Error: Requires Node >= 22.13.0
```

**Solution:**
```bash
# Check version
node --version

# Install correct version
# Using nvm
nvm install 22.13.0
nvm use 22.13.0

# Or download from nodejs.org
```

### Module not found
```
Error: Cannot find module 'express'
```

**Solution:**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## 🔐 Authentication Issues

### Can't register
```
Error: Email already exists
```

**Solution:**
- Use different email
- Or reset database if testing

### Can't login
```
Error: Invalid credentials
```

**Solution:**
1. Verify email and password
2. Check if user exists in database
3. Try registering again
4. Check API logs

### Token expired
```
Error: jwt expired
```

**Solution:**
- Login again
- Token expires after 7 days

## 🗄️ Data Issues

### No data showing
```
Empty lists everywhere
```

**Solution:**
1. Add some test data
2. Check API responses in Network tab
3. Verify businessId is correct
4. Check database has data

### Data not updating
```
Changes don't appear
```

**Solution:**
1. Check API response
2. Clear Redis cache
3. Refresh page
4. Check for errors in console

## 🚀 Performance Issues

### Slow API responses
```
Everything is slow
```

**Solution:**
1. Check Redis is running (caching)
2. Optimize database queries
3. Check system resources
4. Review API logs

### High memory usage
```
System running out of memory
```

**Solution:**
1. Restart services
2. Check for memory leaks
3. Limit Docker memory
4. Close unused applications

## 🔍 Debugging Tips

### Enable verbose logging

**API:**
```typescript
// In apps/api/src/index.ts
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});
```

**Prisma:**
```typescript
// In apps/api/src/lib/prisma.ts
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});
```

### Check all services

```bash
# API
curl http://localhost:5000/health

# ML Service
curl http://localhost:8000/health

# PostgreSQL
docker exec -it stocksense-postgres psql -U postgres -d inventory -c "SELECT 1"

# Redis
docker exec -it stocksense-redis redis-cli ping
```

### View logs

```bash
# Docker logs
docker logs stocksense-postgres
docker logs stocksense-redis

# API logs
# Check terminal where API is running

# Database queries
# Enable Prisma logging (see above)
```

## 🆘 Still Stuck?

1. **Check all terminals** - Look for error messages
2. **Restart everything** - Sometimes it just works
3. **Check environment variables** - Verify all .env files
4. **Review documentation** - Check relevant docs
5. **Google the error** - Someone else had it too
6. **Check GitHub issues** - Known problems
7. **Ask for help** - Open an issue

## 🔄 Nuclear Option

When all else fails:

```bash
# Stop everything
docker compose down -v
pkill -f node
pkill -f python

# Clean everything
rm -rf node_modules
rm -rf apps/*/node_modules
rm -rf apps/ml-service/venv

# Start fresh
docker compose up -d
cd apps/api && npm install
cd ../dashboard && npm install
cd ../ml-service && pip install -r requirements.txt

# Run migrations
cd apps/api && npx prisma generate && npx prisma migrate dev

# Start services
# Terminal 1: cd apps/api && npm run dev
# Terminal 2: cd apps/ml-service && uvicorn main:app --reload
# Terminal 3: cd apps/dashboard && npm run dev
# Terminal 4: cd apps/api && npm run worker
```

## 📝 Reporting Issues

When reporting issues, include:
- Error message (full text)
- What you were trying to do
- Steps to reproduce
- Your environment (OS, Node version, etc.)
- Relevant logs
- What you've already tried

---

**Remember:** Most issues are environment-related. Check your setup first!
