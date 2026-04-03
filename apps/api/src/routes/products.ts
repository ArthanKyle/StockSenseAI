import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma.js';
import { redisClient } from '../lib/redis.js';
import { authenticate, AuthRequest } from '../middleware/auth.js';

const router = Router();
router.use(authenticate);

const productSchema = z.object({
  name: z.string(),
  sku: z.string(),
  category: z.string(),
  currentStock: z.number().int().min(0),
  lowStockThreshold: z.number().int().min(0),
  unitPrice: z.number().positive(),
  costPrice: z.number().positive()
});

router.get('/', async (req: AuthRequest, res) => {
  try {
    const cacheKey = `products:${req.user!.businessId}`;
    const cached = await redisClient.get(cacheKey);
    
    if (cached) {
      return res.json(JSON.parse(cached));
    }

    const products = await prisma.product.findMany({
      where: { businessId: req.user!.businessId },
      orderBy: { createdAt: 'desc' }
    });

    await redisClient.setEx(cacheKey, 300, JSON.stringify(products));
    res.json(products);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req: AuthRequest, res) => {
  try {
    const data = productSchema.parse(req.body);
    
    const product = await prisma.product.create({
      data: { ...data, businessId: req.user!.businessId }
    });

    await redisClient.del(`products:${req.user!.businessId}`);
    res.status(201).json(product);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/:id', async (req: AuthRequest, res) => {
  try {
    const data = productSchema.partial().parse(req.body);
    
    const product = await prisma.product.updateMany({
      where: { id: req.params.id, businessId: req.user!.businessId },
      data
    });

    await redisClient.del(`products:${req.user!.businessId}`);
    res.json(product);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', async (req: AuthRequest, res) => {
  try {
    await prisma.product.deleteMany({
      where: { id: req.params.id, businessId: req.user!.businessId }
    });

    await redisClient.del(`products:${req.user!.businessId}`);
    res.json({ message: 'Product deleted' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
