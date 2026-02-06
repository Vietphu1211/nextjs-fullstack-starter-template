import { prisma } from "@/lib/prisma";

export const getPasswordResetTokenByToken = async (token:string)=> {
    try {
        const passwordResetToken = await prisma.passwordResetToken.findUnique( { 
            where:{ token }
        }
        )
        console.log("existingToken in lib",passwordResetToken)
        return passwordResetToken;
    } catch  {
        return null;
    }
}

