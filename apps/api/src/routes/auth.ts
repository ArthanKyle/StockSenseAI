import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { prisma } from '../lib/prisma.js';

const router = Router();

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string(),
  businessName: z.string()
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string()
});

router.post('/register', async (req, res) => {
  try {
    const { email, password, name, businessName } = registerSchema.parse(req.body);

    const hashedPassword = await bcrypt.hash(password, 10);

    const business = await prisma.business.create({
      data: {
        name: businessName,
        email,
        users: {
          create: {
            email,
            password: hashedPassword,
            name,
            role: 'OWNER'
          }
        }
      },
      include: { users: true }
    });

    const user = business.users[0];
    const token = jwt.sign(
      { id: user.id, businessId: business.id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );

    res.json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, businessId: user.businessId, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );

    res.json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
