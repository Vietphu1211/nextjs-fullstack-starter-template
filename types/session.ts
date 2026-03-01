import { ExtendedUser } from "@/types/user";

declare module "next-auth" {
    interface Session {
        user: ExtendedUser;
        accessToken?: string;
        error?: string
    }
}