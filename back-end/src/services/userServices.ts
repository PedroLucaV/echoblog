import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient;

export const getService = async () => {
    return prisma.users.findMany();
}