import type { Context, Next } from 'hono';
import { PrismaClient } from '../generated/prisma/client.js';
import "dotenv/config";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error('DATABASE_URL is not set');
}
const prisma = new PrismaClient({ datasourceUrl: databaseUrl });

function withPrisma(c: Context, next: Next) {
  if (!c.get('prisma')) {
    c.set('prisma', prisma);
  }
  return next();
}

export default withPrisma;