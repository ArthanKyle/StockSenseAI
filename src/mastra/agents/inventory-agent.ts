import { Agent } from '@mastra/core/agent';
import { openai } from '@mastra/core/providers';
import { z } from 'zod';

export const inventoryAnalystAgent = new Agent({
  name: 'inventoryAnalyst',
  instructions: `You are an AI inventory analyst for StockSenseAI. Your role is to:
  
  1. Analyze inventory levels and provide insights
  2. Recommend restocking based on sales trends and forecasts
  3. Identify slow-moving products and suggest actions
  4. Answer business questions about inventory performance
  5. Explain alerts and provide actionable recommendations
  6. Help optimize stock levels to prevent overstock and stockouts
  
  Be concise, data-driven, and actionable in your responses. Always provide specific numbers and recommendations.`,
  model: openai('gpt-4o'),
  tools: {
    getInventoryStatus: {
      description: 'Get current inventory status for all products in the business',
      parameters: z.object({
        businessId: z.string().describe('The business ID to query')
      }),
      execute: async ({ businessId }) => {
        // In production, this would call the API
        return {
          message: 'Connect this tool to your API endpoint at /api/products',
          businessId
        };
      }
    },
    analyzeSlowMoving: {
      description: 'Analyze slow-moving products that haven\'t sold recently',
      parameters: z.object({
        businessId: z.string(),
        days: z.number().default(30).describe('Number of days to look back')
      }),
      execute: async ({ businessId, days }) => {
        return {
          message: 'Connect this tool to analyze sales data',
          businessId,
          days
        };
      }
    },
    getRestockRecommendations: {
      description: 'Get AI-powered restock recommendations based on forecasts',
      parameters: z.object({
        businessId: z.string(),
        productId: z.string().optional()
      }),
      execute: async ({ businessId, productId }) => {
        return {
          message: 'Connect this tool to forecast service',
          businessId,
          productId
        };
      }
    }
  }
});
