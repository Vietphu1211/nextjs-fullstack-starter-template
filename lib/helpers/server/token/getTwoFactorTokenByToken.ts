import { prisma } from "@/lib/prisma";

export const getTwoFactorTokenByToken = async (token:string) => {
    try {
        const twoFactorToken = await prisma.twoFactorToken.findUnique({
            where: { token }
        });

        return twoFactorToken;
    } catch {
        return null;
    }
};