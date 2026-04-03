import { Router } from 'express';
import { prisma } from '../lib/prisma.js';
import { redisClient } from '../lib/redis.js';
import { authenticate, AuthRequest } from '../middleware/auth.js';

const router = Router();
router.use(authenticate);

router.get('/', async (req: AuthRequest, res) => {
  try {
    const cacheKey = `alerts:${req.user!.businessId}`;
    const cached = await redisClient.get(cacheKey);
    
    if (cached) {
      return res.json(JSON.parse(cached));
    }

    const alerts = await prisma.alert.findMany({
      where: { businessId: req.user!.businessId },
      orderBy: { createdAt: 'desc' },
      take: 100
    });

    await redisClient.setEx(cacheKey, 60, JSON.stringify(alerts));
    res.json(alerts);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.patch('/:id/read', async (req: AuthRequest, res) => {
  try {
    await prisma.alert.updateMany({
      where: { id: req.params.id, businessId: req.user!.businessId },
      data: { isRead: true }
    });

    await redisClient.del(`alerts:${req.user!.businessId}`);
    res.json({ message: 'Alert marked as read' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
