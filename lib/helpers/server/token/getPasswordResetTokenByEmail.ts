import { prisma } from "@/lib/prisma";

// lấy token(token được tạo ra trong bản passwordResetToken) bằng email
export const getPasswordResetTokenByEmail = async (email:string) => {
   try {
    const passwordResetToken = await prisma.passwordResetToken.findFirst({
        where:{
            email
        }
    })
    return passwordResetToken;
   } catch  {
    return null;
   }
}