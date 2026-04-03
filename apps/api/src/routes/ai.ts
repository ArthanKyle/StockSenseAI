import { Router } from 'express';
import axios from 'axios';
import { authenticate, AuthRequest } from '../middleware/auth.js';

const router = Router();
router.use(authenticate);

router.post('/ask', async (req: AuthRequest, res) => {
  try {
    const { question } = req.body;
    
    const response = await axios.post(`${process.env.MASTRA_API_URL}/api/agents/inventoryAnalyst/generate`, {
      messages: [{ role: 'user', content: question }],
      businessId: req.user!.businessId
    });

    res.json({ answer: response.data });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
