import NextAuth, { DefaultSession } from "next-auth";
export type ExtendUser ={
    role: "ADMIN" | "USER";

}
declare module "next-auth"{
    interface Session {
        user : ExtendUser;
    }
}

import {JWT} from "@auth/core/jwt";

declare module "@auth/core/jwt"{
    interface JWT{
        role?: "ADMIN" | "USER";
    }
}