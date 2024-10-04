import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient;

export const getService = async () => {
    return prisma.users.findMany();
}

export const createService = async (user: any) => {
    const email = prisma.users.findFirst({where: {email: user.email}});

    if(!email){
        prisma.users.create({data: user});
        return true;
    }
    return false;
}