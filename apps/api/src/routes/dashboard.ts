import { Router } from 'express';
import { prisma } from '../lib/prisma.js';
import { redisClient } from '../lib/redis.js';
import { authenticate, AuthRequest } from '../middleware/auth.js';

const router = Router();
router.use(authenticate);

router.get('/stats', async (req: AuthRequest, res) => {
  try {
    const cacheKey = `dashboard:${req.user!.businessId}`;
    const cached = await redisClient.get(cacheKey);
    
    if (cached) {
      return res.json(JSON.parse(cached));
    }

    const [totalProducts, lowStockCount, totalSales, recentSales] = await Promise.all([
      prisma.product.count({ where: { businessId: req.user!.businessId } }),
      prisma.product.count({
        where: {
          businessId: req.user!.businessId,
          currentStock: { lte: prisma.product.fields.lowStockThreshold }
        }
      }),
      prisma.sale.aggregate({
        where: { businessId: req.user!.businessId },
        _sum: { totalAmount: true }
      }),
      prisma.sale.findMany({
        where: {
          businessId: req.user!.businessId,
          createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
        },
        select: { totalAmount: true, createdAt: true }
      })
    ]);

    const stats = {
      totalProducts,
      lowStockCount,
      totalRevenue: totalSales._sum.totalAmount || 0,
      recentSalesData: recentSales
    };

    await redisClient.setEx(cacheKey, 120, JSON.stringify(stats));
    res.json(stats);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
