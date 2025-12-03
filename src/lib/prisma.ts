import type { Context, Next } from 'hono';
import { PrismaClient } from '../generated/prisma/client.js';
import { PrismaPg} from '@prisma/adapter-pg'
import "dotenv/config";

const adapter = new PrismaPg({ 
  connectionString: process.env.DATABASE_URL 
});
const prisma = new PrismaClient({ adapter });



function withPrisma(c: Context, next: Next) {
  if (!c.get('prisma')) {
    c.set('prisma', prisma);
  }
  return next();
}

export default withPrisma;