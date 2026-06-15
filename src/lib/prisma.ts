import { PrismaClient } from '@prisma/client'

// Previne múltiplas instâncias do Prisma Client durante o desenvolvimento (devido ao hot-reload do Next.js)
const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query'], // Opcional: mostra as consultas no terminal para ajudar a debugar
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
