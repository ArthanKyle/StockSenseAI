import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    // Test connection
    await prisma.$connect();
    console.log('✅ Database connection successful!');
    
    // Count tables
    const businessCount = await prisma.business.count();
    const userCount = await prisma.user.count();
    const productCount = await prisma.product.count();
    
    console.log(`📊 Database stats:`);
    console.log(`   - Businesses: ${businessCount}`);
    console.log(`   - Users: ${userCount}`);
    console.log(`   - Products: ${productCount}`);
    
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
