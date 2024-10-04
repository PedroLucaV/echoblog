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
    return email;
}

export const checkEmail = async (email: string) => {
    const user = prisma.users.findFirst({where: {email}});

    if(!user){
        return false;
    }
    return user;
}