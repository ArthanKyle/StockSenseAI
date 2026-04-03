import cron from 'node-cron';
import { prisma } from './lib/prisma.js';
import axios from 'axios';

console.log('🔄 Worker started');

// Check for low stock every hour
cron.schedule('0 * * * *', async () => {
  console.log('Running low stock check...');
  
  try {
    const businesses = await prisma.business.findMany();

    for (const business of businesses) {
      const lowStockProducts = await prisma.product.findMany({
        where: {
          businessId: business.id,
          currentStock: { lte: prisma.product.fields.lowStockThreshold }
        }
      });

      for (const product of lowStockProducts) {
        await prisma.alert.create({
          data: {
            businessId: business.id,
            type: 'LOW_STOCK',
            severity: product.currentStock === 0 ? 'CRITICAL' : 'HIGH',
            message: `${product.name} is low on stock (${product.currentStock} units remaining)`,
            productId: product.id
          }
        });
      }
    }
  } catch (error) {
    console.error('Low stock check error:', error);
  }
});

// Generate forecasts daily at 2 AM
cron.schedule('0 2 * * *', async () => {
  console.log('Generating forecasts...');
  
  try {
    const businesses = await prisma.business.findMany();

    for (const business of businesses) {
      const products = await prisma.product.findMany({
        where: { businessId: business.id }
      });

      for (const product of products) {
        const salesHistory = await prisma.saleItem.findMany({
          where: { productId: product.id },
          include: { sale: true },
          orderBy: { sale: { createdAt: 'desc' } },
          take: 30
        });

        if (salesHistory.length > 0) {
          try {
            const response = await axios.post(`${process.env.ML_SERVICE_URL}/forecast`, {
              productId: product.id,
              salesHistory: salesHistory.map(item => ({
                date: item.sale.createdAt,
                quantity: item.quantity
              }))
            });

            const forecasts = response.data.forecasts;
            
            for (const forecast of forecasts) {
              await prisma.forecast.upsert({
                where: {
                  productId_forecastDate: {
                    productId: product.id,
                    forecastDate: new Date(forecast.date)
                  }
                },
                update: {
                  predictedDemand: forecast.demand,
                  confidence: forecast.confidence
                },
                create: {
                  businessId: business.id,
                  productId: product.id,
                  forecastDate: new Date(forecast.date),
                  predictedDemand: forecast.demand,
                  confidence: forecast.confidence
                }
              });
            }
          } catch (error) {
            console.error(`Forecast error for product ${product.id}:`, error);
          }
        }
      }
    }
  } catch (error) {
    console.error('Forecast generation error:', error);
  }
});

// Detect slow-moving products weekly
cron.schedule('0 3 * * 0', async () => {
  console.log('Checking for slow-moving products...');
  
  try {
    const businesses = await prisma.business.findMany();
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    for (const business of businesses) {
      const products = await prisma.product.findMany({
        where: { businessId: business.id }
      });

      for (const product of products) {
        const recentSales = await prisma.saleItem.count({
          where: {
            productId: product.id,
            sale: { createdAt: { gte: thirtyDaysAgo } }
          }
        });

        if (recentSales === 0 && product.currentStock > 0) {
          await prisma.alert.create({
            data: {
              businessId: business.id,
              type: 'SLOW_MOVING',
              severity: 'MEDIUM',
              message: `${product.name} has not sold in the last 30 days`,
              productId: product.id
            }
          });
        }
      }
    }
  } catch (error) {
    console.error('Slow-moving check error:', error);
  }
});
