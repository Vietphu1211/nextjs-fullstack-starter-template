import { db } from "@/lib/db";

export const getUserById = async (id:string | undefined) =>{
    try {
        const user = await prismaClient.user.findUnique({
            where: {
                id
            }
        })
        return user;
    } catch {
        return null;
    }
}