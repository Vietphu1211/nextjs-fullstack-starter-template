

import { Role, UserRole } from "@prisma/client";
import { DefaultSession } from "next-auth";


export interface AuthUser {
    id: string;
    name?: string | null;   // Nullable to match schema
    email?: string | null;  // Nullable to match schema
    emailVerified?: Date | null;
    image?: string | null;  // Added to match schema
    password?: string | null; // Nullable to match schema
    role: Role;
    isTwoFactorEnabled: boolean;
}


export type ExtendedUser = DefaultSession["user"] & {
    id: string;
    name?: string | null;
    email: string;
    role: UserRole;
    isTwoFactorEnabled: Boolean;
    isOAuth: boolean;
    is2FAVerified: boolean;
};

