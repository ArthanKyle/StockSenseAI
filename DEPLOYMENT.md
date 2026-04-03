# StockSenseAI Deployment Guide

## Production Checklist

### Security
- [ ] Change JWT_SECRET to a strong random value
- [ ] Use environment variables for all secrets
- [ ] Enable HTTPS/SSL
- [ ] Configure CORS properly
- [ ] Set up rate limiting
- [ ] Enable database SSL connections
- [ ] Use strong database passwords
- [ ] Set up firewall rules

### Database
- [ ] Use managed PostgreSQL (AWS RDS, Supabase, Neon, etc.)
- [ ] Set up automated backups
- [ ] Configure connection pooling
- [ ] Enable query logging
- [ ] Set up monitoring

### Redis
- [ ] Use managed Redis (AWS ElastiCache, Upstash, Redis Cloud)
- [ ] Configure persistence
- [ ] Set up monitoring
- [ ] Configure memory limits

### Application
- [ ] Build frontend for production
- [ ] Optimize bundle size
- [ ] Enable compression
- [ ] Set up CDN for static assets
- [ ] Configure logging
- [ ] Set up error tracking (Sentry, etc.)
- [ ] Configure monitoring (DataDog, New Relic, etc.)

## Deployment Options

### Option 1: Vercel + Railway

#### Frontend (Vercel)
```bash
cd apps/dashboard
npm run build
# Deploy to Vercel
vercel --prod
```

#### Backend (Railway)
1. Create new project on Railway
2. Add PostgreSQL and Redis services
3. Deploy API service
4. Deploy ML service
5. Set environment variables

### Option 2: AWS

#### Architecture
```
CloudFront (CDN)
    ↓
S3 (Frontend)
    ↓
ALB (Load Balancer)
    ↓
ECS/Fargate (API + ML Service)
    ↓
RDS PostgreSQL
    ↓
ElastiCache Redis
```

#### Steps
1. Build and push Docker images to ECR
2. Set up RDS PostgreSQL
3. Set up ElastiCache Redis
4. Deploy to ECS/Fargate
5. Configure ALB
6. Deploy frontend to S3 + CloudFront
7. Set up Route53 for DNS

### Option 3: DigitalOcean

#### Using App Platform
1. Connect GitHub repository
2. Configure build settings
3. Add PostgreSQL and Redis managed databases
4. Set environment variables
5. Deploy

### Option 4: Docker Compose (VPS)

#### docker-compose.prod.yml
```yaml
version: '3.8'

services:
  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: always

  redis:
    image: redis:7-alpine
    restart: always

  api:
    build: ./apps/api
    environment:
      DATABASE_URL: ${DATABASE_URL}
      REDIS_URL: redis://redis:6379
      JWT_SECRET: ${JWT_SECRET}
    depends_on:
      - postgres
      - redis
    restart: always

  ml-service:
    build: ./apps/ml-service
    restart: always

  worker:
    build: ./apps/api
    command: npm run worker
    environment:
      DATABASE_URL: ${DATABASE_URL}
    depends_on:
      - postgres
    restart: always

  frontend:
    build: ./apps/dashboard
    ports:
      - "80:80"
    restart: always

volumes:
  postgres_data:
```

Deploy:
```bash
docker compose -f docker-compose.prod.yml up -d
```

## Environment Variables

### Production API (.env)
```bash
DATABASE_URL="postgresql://user:pass@host:5432/db"
REDIS_URL="redis://host:6379"
JWT_SECRET="super-secret-production-key-min-32-chars"
PORT=5000
NODE_ENV=production
MASTRA_API_URL="https://your-mastra-url.com"
ML_SERVICE_URL="https://your-ml-service-url.com"
CORS_ORIGIN="https://your-frontend-url.com"
```

### Production Frontend (.env)
```bash
VITE_API_URL="https://api.your-domain.com"
```

## Database Migrations

Run migrations in production:
```bash
cd apps/api
npx prisma migrate deploy
```

## Monitoring

### Health Checks
- API: `GET /health`
- ML Service: `GET /health`

### Metrics to Monitor
- API response times
- Database connection pool
- Redis hit rate
- Error rates
- CPU/Memory usage
- Disk space

### Logging
Use structured logging:
```typescript
logger.info('Sale created', {
  saleId: sale.id,
  amount: sale.totalAmount,
  businessId: business.id
});
```

## Backup Strategy

### Database
- Automated daily backups
- Point-in-time recovery enabled
- Test restore procedures monthly

### Redis
- RDB snapshots every 6 hours
- AOF persistence enabled

## Scaling

### Horizontal Scaling
- Run multiple API instances behind load balancer
- Use Redis for session storage
- Ensure stateless API design

### Database Scaling
- Read replicas for analytics
- Connection pooling (PgBouncer)
- Query optimization

### Caching Strategy
- Cache frequently accessed data
- Set appropriate TTLs
- Implement cache warming

## Security Best Practices

1. Use HTTPS everywhere
2. Implement rate limiting
3. Validate all inputs
4. Use parameterized queries (Prisma handles this)
5. Keep dependencies updated
6. Regular security audits
7. Implement CSRF protection
8. Use security headers (helmet.js)

## CI/CD Pipeline

### GitHub Actions Example
```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Build and test
        run: |
          npm install
          npm test
      - name: Deploy
        run: |
          # Your deployment commands
```

## Cost Optimization

1. Use managed services for databases
2. Implement caching aggressively
3. Optimize database queries
4. Use CDN for static assets
5. Right-size compute resources
6. Set up auto-scaling
7. Monitor and optimize costs regularly

## Support

For deployment issues, check:
1. Application logs
2. Database logs
3. Redis logs
4. Network connectivity
5. Environment variables
6. SSL certificates
7. DNS configuration
