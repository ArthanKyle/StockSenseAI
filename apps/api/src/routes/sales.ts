import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma.js';
import { authenticate, AuthRequest } from '../middleware/auth.js';

const router = Router();
router.use(authenticate);

const saleSchema = z.object({
  items: z.array(z.object({
    productId: z.string(),
    quantity: z.number().int().positive(),
    unitPrice: z.number().positive()
  }))
});

router.post('/', async (req: AuthRequest, res) => {
  try {
    const { items } = saleSchema.parse(req.body);
    
    const totalAmount = items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);

    const sale = await prisma.$transaction(async (tx) => {
      const newSale = await tx.sale.create({
        data: {
          businessId: req.user!.businessId,
          userId: req.user!.id,
          totalAmount,
          items: {
            create: items
          }
        },
        include: { items: true }
      });

      for (const item of items) {
        await tx.product.update({
          where: { id: item.productId },
          data: { currentStock: { decrement: item.quantity } }
        });

        await tx.inventoryLog.create({
          data: {
            productId: item.productId,
            type: 'SALE',
            quantity: -item.quantity,
            reason: `Sale #${newSale.id}`
          }
        });
      }

      return newSale;
    });

    res.status(201).json(sale);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/', async (req: AuthRequest, res) => {
  try {
    const sales = await prisma.sale.findMany({
      where: { businessId: req.user!.businessId },
      include: { items: { include: { product: true } }, user: true },
      orderBy: { createdAt: 'desc' },
      take: 50
    });

    res.json(sales);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
