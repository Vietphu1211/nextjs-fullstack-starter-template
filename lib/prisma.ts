import {PrismaPg} from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { PrismaClient } from '@prisma/client';
import 'dotenv/config';

// Biến toàn cục để giữ kết nối PrismaClient
const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined
}
// Tạo pg.pool instance cho adapter
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
})

// Create adapter with pool instance
// Cast pool to any to avoid conflicting @types/pg versions causing incompatible types
const adapter = new PrismaPg(pool);

export const prisma = globalForPrisma.prisma || new PrismaClient({
    adapter,
    log: ['error', 'warn'],
});

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;